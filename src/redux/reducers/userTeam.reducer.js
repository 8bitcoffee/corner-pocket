const userTeam = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEAMS':
          return action.payload;
        default:
          return state;
    }
}

// reducer set as userLeague
export default userTeam;