const userLeague = (state = [], action) => {
    switch (action.type) {
        case 'SET_LEAGUE':
          return action.payload;
        default:
          return state;
    }
}

// reducer set as userLeague
export default userLeague;