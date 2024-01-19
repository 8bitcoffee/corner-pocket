import axios from 'axios';
import { DateTime } from 'luxon';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeam(action){
    try {
        let teamInfo = yield axios.get(`/api/team/${action.payload.id}`);
        let roster = yield axios.get(`/api/team/roster/${action.payload.id}`);
        let matchups = yield axios.get(`/api/match/team/${action.payload.id}`);

        matchups = matchups.data;
        teamInfo = teamInfo.data;
        roster = roster.data;

        let nextDate = "1992-04-26";

        if (matchups.length > 0){
            nextDate = DateTime.fromISO(matchups[0].date);
            nextDate = nextDate.toISODate();
        }
        else {
            matchups = [{away_team_id : "", home_team_id: "", date: nextDate}]
        }
        
        let opponentId = "";
        let nextOpponentInfo;
        let away_team_name;
        let home_team_name;

        if (matchups[0].away_team_id == action.payload.id){
            away_team_name = teamInfo.team_name;
            opponentId = matchups[0].home_team_id;
        }
        else {
            opponentId = matchups[0].away_team_id;
            home_team_name = teamInfo.team_name
        }

        if (opponentId == null){
            nextOpponentInfo = {team_name: "BYE"}
        }
        else{
            nextOpponentInfo = yield axios.get(`/api/team/${opponentId}`);
            nextOpponentInfo = nextOpponentInfo.data;
            nextOpponentInfo.matchup_id = matchups[0].matchup_id;
        }

        if (away_team_name == teamInfo.team_name){
            home_team_name = nextOpponentInfo.team_name;
        }
        else{
            away_team_name = nextOpponentInfo.team_name;
        }

        if (matchups[0].date == "1992-04-26"){
            matchups = [];
        }
        nextOpponentInfo.date = nextDate;
        nextOpponentInfo.home_team_name = home_team_name;
        nextOpponentInfo.away_team_name = away_team_name;
        yield put({type: "SET_TEAM", payload: {teamInfo: teamInfo, roster: roster, matchups: matchups, nextOpponentInfo, nextOpponentInfo}});
    }
    catch (error) {
        console.error("Error fetching team info", error);
    }
}

function* teamSaga(){
    yield takeLatest("FETCH_TEAM", getTeam);
}

export default teamSaga;