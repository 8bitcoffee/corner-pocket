const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Get all tournaments for a user
router.get('/user/', rejectUnauthenticated, (req,res) => {
    let queryText = `
        SELECT * FROM "tournaments"
        JOIN "leagues_tournaments" ON "leagues_tournaments"."tournament_id" = "tournaments"."id"
        JOIN "users_leagues" ON "leagues_tournaments"."league_id" = "users_leagues"."league_id"
        WHERE "users_leagues"."user_id" = $1;
    `;
    pool.query(queryText,[req.user.id])
        .then((result) => {res.send(result.rows)})
        .catch((error) => {
            console.error("Error in tournaments by league GET", error);
            res.sendStatus(500);
        })
    ;
});

// Get all tournaments for a league
router.get('/league/:id', rejectUnauthenticated, (req,res) => {
    let queryText = `
        SELECT * FROM "tournaments"
        JOIN "leagues_tournaments" ON "leagues_tournaments"."tournament_id" = "tournaments"."id"
        WHERE "leagues_tournaments"."league_id" = $1;
    `;
    pool.query(queryText,[req.params.id])
        .then((result) => {res.send(result.rows)})
        .catch((error) => {
            console.error("Error in tournaments by league GET", error);
            res.sendStatus(500);
        })
    ;
});

// Get all info for a specific tournament
router.get('/:id', rejectUnauthenticated, (req,res) => {
    let queryText = `
        SELECT * FROM "tournaments"
        WHERE "tournaments"."id" = $1;
    `;
    pool.query(queryText,[req.params.id])
        .then((result) => {res.send(result.rows)})
        .catch((error) => {
            console.error("Error in tournaments by league GET", error);
            res.sendStatus(500);
        })
    ;
});

// Create new tournament for a league
router.post('/', rejectUnauthenticated, (req, res) => {
    let queryText = `
        INSERT INTO "tournaments" (
            "tournament_name",
            "bracket",
            "num_teams",
            "playoffs",
            "playoff_num
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
    `;
    pool.query(queryText,[
        req.body.tournament_name,
        req.body.bracket,
        req.body.num_teams,
        req.body.playoffs,
        req.body.playoff_num
    ])
        .then((result) => {
            let tournament_id = result.rows[0].id;
            let queryText = `
                INSERT INTO "leagues_tournaments" (
                    "tournament_id", "league_id"
                )
                VALUES($1, $2);
            `;
            pool.query(queryText,[tournament_id, req.body.league_id])
                .then(() => {res.sendStatus(201)})
                .catch((error) => {
                    console.error("Error in tournaments POST second query", error);
                    res.sendStatus(500);
                })
            ;
        })
        .catch((error) => {
            console.error("Error in tournaments POST first query", error);
            res.sendStatus(500);
        })
});

module.exports = router;