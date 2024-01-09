const userTeam = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEAM':
          return action.payload;
        default:
          return state;
    }
}

export default userTeam;