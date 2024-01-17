const userTeam = (state = {
  teamInfo: {
    team_name:"",
    join_code:""
  },
  roster:[],
  matchups:[],
  nextOpponentInfo:{
    team_name: "",
    date: "",
    home_team_name: "",
    away_team_name: ""
  }
}, action) => {
    switch (action.type) {
        case 'SET_TEAM':
          return action.payload;
        default:
          return state;
    }
}

export default userTeam;