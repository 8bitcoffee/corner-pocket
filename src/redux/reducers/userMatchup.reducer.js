const userMatchup = (state = {
  games: [],
  rounds: [],
  info: [],
  home: {owner_id: 0},
  homeRoster: [],
  away: {owner_id: 0},
  awayRoster: [],
}, action) => {
    switch (action.type) {
        case 'SET_MATCHUP':
          return action.payload;
        default:
          return state;
    }
}

// reducer set as userLeague
export default userMatchup;