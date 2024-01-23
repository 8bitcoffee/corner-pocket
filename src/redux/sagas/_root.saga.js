import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import updateUserSaga from './updateUser.saga';
import activitiesSaga from './getActivities.saga';
import createLeagueSaga from './createLeague.saga';
import leagueSaga from './getLeague.saga';
import leaguesSaga from './getLeagues.saga';
import teamsSaga from './getTeams.saga';
import createTeamSaga from './createTeam.saga';
import teamSaga from './getTeam.saga';
import joinTeamSaga from './joinTeam.saga';
import getTournamentsSaga from './getTournaments.saga';
import createTournamentSaga from './createTournament.saga';
import getTournamentSaga from './getTournament.saga';
import getMatchup from './getMatchup.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    updateUserSaga(),
    activitiesSaga(),
    createLeagueSaga(),
    leagueSaga(),
    leaguesSaga(),
    teamsSaga(),
    teamSaga(),
    createTeamSaga(),
    joinTeamSaga(),
    getTournamentsSaga(),
    createTournamentSaga(),
    getTournamentSaga(),
    getMatchup(),
  ]);
}
