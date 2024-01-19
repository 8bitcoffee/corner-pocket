import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import userLeague from './userLeague.reducer';
import userLeagues from './userLeagues.reducer';
import activities from './activity.reducer';
import userTeam from './userTeam.reducer';
import userTeams from './userTeams.reducer';
import leagueTournaments from './leagueTournaments.reducer';
import userTournament from './userTournament.reducer';
import userTournamentInfo from './userTournamentInfo.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  userLeague, // Specific league
  userLeagues, // leagues the user is a member of
  activities, // activities able to make a league of
  userTeam, // specific team
  userTeams, // all teams user is a part of
  leagueTournaments, // Tournaments in a specific league
  userTournament, // Specific tournament used in tournament mangement
  userTournamentInfo,
});

export default rootReducer;