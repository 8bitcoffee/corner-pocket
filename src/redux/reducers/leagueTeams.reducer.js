const leagueTeams = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LEAGUE_TEAMS':
          return action.payload;
        default:
          return state;
    }
}

export default leagueTeams;