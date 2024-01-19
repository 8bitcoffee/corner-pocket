const userTournamentInfo = (state = {
    id: 0,
    name: "",
    num_matchups: 0,
    start_date: "" ,
    end_date: ""
}, action) => {
    switch (action.type) {
        case 'SET_TOURNAMENT_INFO':
          return action.payload;
        default:
          return state;
    }
}

export default userTournamentInfo;