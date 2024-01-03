const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "leagues"
    JOIN "users_leagues" ON "users_leagues"."league_id" = "leagues"."id"
    WHERE "users_leagues"."user_id" = $1;
  `;
  pool.query(queryText,[Number(req.params.id)])
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
      console.error("Error in league GET", error);
      res.sendStatus(500);
    })
  ;
});

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  let queryText = `
    INSERT INTO "leagues" (league_name, activity_id, owner_id, number_of_teams)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;
  pool.query(queryText, [req.body.league_name, req.body.activity_id, req.body.owner_id, req.body.number_of_teams])
    .then((result) => {
      console.log(result.rows)
      const league_id = result.rows[0].id
      let queryText = `
        INSERT INTO "users_leagues" ("user_id", "league_id")
        VALUES ($1, $2);
      `;
      pool.query(queryText, [req.body.owner_id, league_id])
        .then(() => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.error("Error in secondary query POST league", error);
          res.sendStatus(500);
        })
    })
    .catch((error) => {
      console.error("Error in POST league", error);
      res.sendStatus(500);
    })
});

module.exports = router;