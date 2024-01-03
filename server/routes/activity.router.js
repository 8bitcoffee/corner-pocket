const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `
    SELECT * FROM "activities";
  `;
  pool.query(queryText)
    .then((result)=>{
      res.send(result.rows);
    })
    .catch((error)=>{
        console.error("Error in GET activities", error);
        res.sendStatus(500);
    })
});

module.exports = router;