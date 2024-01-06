const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// GET leagues that a specific user is a member of
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "leagues"
    JOIN "users_leagues" ON "users_leagues"."league_id" = "leagues"."id"
    WHERE "users_leagues"."user_id" = $1;
  `;
  pool.query(queryText,[req.user.id])
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
      console.error("Error in league GET", error);
      res.sendStatus(500);
    })
  ;
});

// GET info on a specific league
router.get('/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "leagues"
    JOIN "teams_leagues" ON "teams_leagues"."league_id" = "leagues"."id"
    WHERE "leagues"."id" = $1;
  `;
  pool.query(queryText,[req.params.id])
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
      console.error("Error in league/:id GET", error);
      res.sendStatus(500);
    })
  ;
});

// Create league
router.post('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    INSERT INTO "leagues" (league_name, activity_id, owner_id, number_of_teams)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;
  pool.query(queryText, [req.body.league_name, req.body.activity_id, req.user.id, req.body.number_of_teams])
    .then((result) => {
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