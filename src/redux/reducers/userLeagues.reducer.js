const userLeagues = (state = [], action) => {
    switch (action.type) {
        case 'SET_LEAGUES':
          return action.payload;
        default:
          return state;
    }
}

// reducer set as userLeague
export default userLeagues;