const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Get matchups for user
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
});

// Get specific matchup
router.get('/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
});

// Get matchups for team
router.get('/team/:teamid', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "matchups"
    LEFT JOIN "teams_matchups" ON "teams_matchups"."matchup_id" = "matchups"."id"
    LEFT JOIN "teams" ON "teams"."id" = "teams_matchups"."team_id"
    WHERE "teams"."id" = $1
    ORDER BY "matchups"."date" ASC;
  `;
  pool.query(queryText, [req.params.teamid])
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
      console.error("Error on GET matchups by team", error);
      res.sendStatus(500);
    })
  ;
});

// Get matchups for league
router.get('/league/:leagueid', rejectUnauthenticated, (req, res) => {
  // GET route code here
});

// POST matchup. Also populates rounds and games accordingly
router.post('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    INSERT INTO "matchups" (
      "date",
      "bye",
      "home_team_id",
      "away_team_id",
      "tournament_id"
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;
  pool.query(queryText,[
    req.body.date,
    req.body.bye,
    req.body.home_team_id,
    req.body.away_team_id, 
    req.body.tournament_id
  ])
    .then((result) => {
      const matchup_id = result.rows[0].id;
      let queryText2 = `
        INSERT INTO "rounds" ("matchup_id" , "round_number")
        VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5), ($1, $6)
        RETURNING id; 
      `;
      pool.query(queryText2, [matchup_id, 1, 2, 3, 4, 5])
        .then((result2) => {
          let roundIds = [];
          for(let row of result2.rows){
            roundIds.push(row.id)
          }
          let queryText3 = `
            INSERT INTO "games" ("matchup_id", "round_id", "game_number")
            VALUES
              ($1 , $2 , $7),($1 , $2 , $8),($1 , $2 , $9),($1 , $2 , $10),($1 , $2 , $11),
              ($1 , $3 , $7),($1 , $3 , $8),($1 , $3 , $9),($1 , $3 , $10),($1 , $3 , $11),
              ($1 , $4 , $7),($1 , $4 , $8),($1 , $4 , $9),($1 , $4 , $10),($1 , $4 , $11),
              ($1 , $5 , $7),($1 , $5 , $8),($1 , $5 , $9),($1 , $5 , $10),($1 , $5 , $11),
              ($1 , $6 , $7),($1 , $6 , $8),($1 , $6 , $9),($1 , $6 , $10),($1 , $6 , $11);
          `;
          pool.query(queryText3,[
            matchup_id,
            roundIds[0],roundIds[1],roundIds[2],roundIds[3],roundIds[4],
            1,2,3,4,5
          ])
            .then(()=>{
              if (req.body.home_team_id == null){
                let queryText4 = `
                  INSERT INTO "teams_matchups" ("team_id", "matchup_id")
                  VALUES ($1, $2);
                `;
                pool.query(queryText4,[req.body.away_team_id, matchup_id])
                  .then(() => {res.sendStatus(201)})
                  .catch((error4) => {
                    console.error("Error in third query POST matchup", error4);
                    res.sendStatus(500);
                  })
                ;
              }
              else if (req.body.away_team_id == null){
                let queryText4 = `
                  INSERT INTO "teams_matchups" ("team_id", "matchup_id")
                  VALUES ($1, $2);
                `;
                pool.query(queryText4,[req.body.home_team_id, matchup_id])
                  .then(() => {res.sendStatus(201)})
                  .catch((error4) => {
                    console.error("Error in third query POST matchup", error4);
                    res.sendStatus(500);
                  })
                ;
              }
              else {
                let queryText4 = `
                  INSERT INTO "teams_matchups" ("team_id", "matchup_id")
                  VALUES ($1, $3), ($2, $3);
                `;
                pool.query(queryText4,[req.body.home_team_id, req.body.away_team_id, matchup_id])
                  .then(() => {res.sendStatus(201)})
                  .catch((error4) => {
                    console.error("Error in third query POST matchup", error4);
                    res.sendStatus(500);
                  })
                ;
              }
            })
            .catch((error3) => {
              console.error("Error in third query POST matchup", error3);
              res.sendStatus(500);
            })
        })
        .catch((error2) => {
          console.error("Error in second query POST matchup", error2);
          res.sendStatus(500);
        })
    })
    .catch((error) => {
      console.error("Error in initial query POST matchup", error);
      res.sendStatus(500);
    })
});

module.exports = router;