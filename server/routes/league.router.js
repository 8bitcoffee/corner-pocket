const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
        SELECT * FROM "teams"
        JOIN "leagues" ON "leagues"."id" = "teams"."league_id"
        JOIN "users_teams" ON "teams"."id" = "users_teams"."team_id"
        WHERE "users_teams"."user_id" = $1;
    `;
    pool.query(queryText,[req.params.id])
        .then((result) => {res.send(result.data)})
        .catch((error) => {
            console.error("Error in league GET", error);
            res.sendStatus(500);
        })
    ;
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
});

module.exports = router;