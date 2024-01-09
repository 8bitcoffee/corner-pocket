const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// GET leagues that a specific user is a member of
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT
      leagues.*,
      COUNT(DISTINCT teams_leagues.team_id) AS teams_joined,
      MAX(users_teams.team_id) AS user_team_id,
      MAX(teams.team_name) AS user_team_name
    FROM
      leagues
    JOIN
      users_leagues ON leagues.id = users_leagues.league_id
    LEFT JOIN
      teams_leagues ON leagues.id = teams_leagues.league_id
    LEFT JOIN
      users_teams ON teams_leagues.team_id = users_teams.team_id AND users_leagues.user_id = users_teams.user_id
    LEFT JOIN
      teams ON users_teams.team_id = teams.id
    WHERE
      users_leagues.user_id = $1
    GROUP BY
      leagues.id;
  `;
  pool.query(queryText,[req.user.id])
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
      console.error("Error in league GET", error);
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

// GET a specific league
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`Triggered GET ${req.params.id}`);
  let queryText = `
    SELECT
      leagues.*,
      COUNT(DISTINCT teams_leagues.team_id) AS teams_joined,
      MAX(users_teams.team_id) AS user_team_id,
      MAX(teams.team_name) AS user_team_name
    FROM
      leagues
    JOIN
      users_leagues ON leagues.id = users_leagues.league_id
    LEFT JOIN
      teams_leagues ON leagues.id = teams_leagues.league_id
    LEFT JOIN
      users_teams ON teams_leagues.team_id = users_teams.team_id AND users_leagues.user_id = users_teams.user_id
    LEFT JOIN
      teams ON users_teams.team_id = teams.id
    WHERE
      users_leagues.user_id = $1 AND leagues.id = $2
    GROUP BY "leagues"."id";
  `;
  pool.query(queryText,[req.user.id, req.params.id])
    .then((result) => {res.send(result.rows[0])})
    .catch((error) => {
      console.error("Error in specific league GET", error);
      res.sendStatus(500);
    })
  ;
});

module.exports = router;