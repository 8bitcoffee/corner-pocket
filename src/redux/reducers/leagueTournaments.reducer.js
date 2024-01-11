const leagueTournaments = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOURNAMENTS':
          return action.payload;
        default:
          return state;
    }
}

export default leagueTournaments;