const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "teams"
    JOIN "users_teams" ON "users_teams"."team_id" = "teams"."id"
    JOIN "teams_leagues" ON "teams_leagues"."team_id" = "teams"."id"
    JOIN "leagues" ON "leagues"."id" = "teams_leagues"."league_id"
    WHERE "users_teams"."user_id" = $1;
  `;
  pool.query(queryText,[req.user.id])
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
        console.error("Error in GET teams", error);
        res.sendStatus(500);
    })
  ;
});

router.post('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    INSERT INTO "teams" (team_name, owner_id)
    VALUES ($1, $2)
    RETURNING id;
  `;
  pool.query(queryText, [req.body.team_name, req.user.id])
    .then((result) => {
      const team_id = result.rows[0].id
      let queryText = `
        INSERT INTO "users_teams" ("user_id", "team_id")
        VALUES ($1, $2);
      `;
      pool.query(queryText, [req.user.id, team_id])
        .then(() => {
          let queryText = `
            INSERT INTO "teams_leagues" ("team_id", "league_id")
            VALUES ($1, $2)
          `;
          pool.query(queryText, [team_id, Number(req.body.league_id)])
            .then(() => {res.sendStatus(201)})
            .catch((error) => {
              console.error("Error in third query POST team", error);
              res.sendStatus(500);
            })
          ;
        })
        .catch((error) => {
          console.error("Error in secondary query POST team", error);
          res.sendStatus(500);
        })
      ;
    })
    .catch((error) => {
      console.error("Error in POST team", error);
      res.sendStatus(500);
    })
  ;
});

module.exports = router;