const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const leagueRouter = require('./routes/league.router');
const matchRouter = require('./routes/match.router');
const activityRouter = require('./routes/activity.router');
const teamRouter = require('./routes/team.router');
const tournamentRouter = require('./routes/tournament.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/league', leagueRouter);
app.use('/api/match', matchRouter);
app.use('/api/activity', activityRouter);
app.use('/api/team', teamRouter);
app.use('/api/tournament', tournamentRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5017;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
