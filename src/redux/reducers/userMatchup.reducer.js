const userMatchup = (state = [], action) => {
    switch (action.type) {
        case 'SET_MATCHUP':
          return action.payload;
        default:
          return state;
    }
}

// reducer set as userLeague
export default userMatchup;