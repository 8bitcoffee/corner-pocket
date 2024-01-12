const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Getting team info by user
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

// Team info by league
router.get('/league/:id', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "teams"
    JOIN "users_teams" ON "users_teams"."team_id" = "teams"."id"
    JOIN "teams_leagues" ON "teams_leagues"."team_id" = "teams"."id"
    JOIN "leagues" ON "leagues"."id" = "teams_leagues"."league_id"
    WHERE "leagues"."id" = $1;
  `;
  pool.query(queryText,[req.params.id])
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
        console.error("Error in GET teams by league", error);
        res.sendStatus(500);
    })
  ;
});

// Creating a new team
router.post('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    INSERT INTO "teams" (team_name, owner_id, join_code)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;
  pool.query(queryText, [req.body.team_name, req.user.id, req.body.join_code])
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

// Get specific team info
router.get('/:id', rejectUnauthenticated, (req,res) => {
  let queryText = `
    SELECT * FROM "teams"
    JOIN "users_teams" ON "users_teams"."team_id" = "teams"."id"
    JOIN "user" ON "user"."id" = "users_teams"."user_id"
    WHERE "teams"."id" = $1;
  `;
  pool.query(queryText,[req.params.id])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.error("Error in GET teamid", error);
      res.sendStatus(500);
    })
})

// Get users for a specific team
router.get('/roster/:id', rejectUnauthenticated, (req,res) => {
  let queryText = `
    SELECT * FROM "teams"
    JOIN "users_teams" ON "users_teams"."team_id" = "teams"."id"
    JOIN "user" ON "user"."id" = "users_teams"."user_id"
    WHERE "teams"."id" = $1;
  `;
  pool.query(queryText,[req.params.id])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.error("Error in GET teamid", error);
      res.sendStatus(500);
    })
})

// Joining an existing team
router.post('/join', rejectUnauthenticated, (req,res) => {
  let queryText = `
    WITH user_input AS (
      SELECT $1::BIGINT AS user_id, $2 AS join_code
    ),
    insert_team AS (
        INSERT INTO "users_teams" ("user_id", "team_id")
        SELECT ui.user_id, teams.id
        FROM user_input ui
        JOIN "teams" ON ui.join_code = "teams"."join_code"
        LEFT JOIN "users_teams" ut ON ui.user_id = ut.user_id AND "teams"."id" = ut.team_id
        WHERE ut.team_id IS NULL
        RETURNING "user_id", "team_id"
    )
    INSERT INTO "users_leagues" ("user_id", "league_id")
    SELECT it."user_id", leagues.id
    FROM user_input ui
    JOIN insert_team it ON true
    JOIN "teams_leagues" ON it."team_id" = "teams_leagues"."team_id"
    JOIN "leagues" ON "teams_leagues"."league_id" = leagues.id
    LEFT JOIN "users_leagues" ul ON it."user_id" = ul.user_id AND leagues.id = ul.league_id
    WHERE ul.league_id IS NULL;
  `;
  pool.query(queryText,[req.user.id, req.body.code])
    .then(() => {
      res.sendStatus(201)
    })
    .catch((error) => {
      console.error("Error in POST join /team", error);
      res.sendStatus(500);
    })
  ;
})

module.exports = router;