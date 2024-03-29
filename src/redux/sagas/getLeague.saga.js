import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getLeague(action){
    try {
        const leagueInfo = yield axios.get(`/api/league/${action.payload.id}`);
        const teamsInfo = yield axios.get(`/api/team/league/${action.payload.id}`);
        const usersInfo = yield axios.get(`/api/user/league/${action.payload.id}`);
        const tournamentsInfo = yield axios.get(`/api/tournament/league/${action.payload.id}`);
        const league = {
            leagueInfo: leagueInfo.data,
            teamsInfo: teamsInfo.data,
            usersInfo: usersInfo.data,
            tournamentsInfo: tournamentsInfo.data
        };
        yield put({type: "SET_LEAGUE", payload: league});
    }
    catch (error) {
        console.error("Error fetching league info", error);
    }
}

function* leagueSaga(){
    yield takeLatest("FETCH_LEAGUE", getLeague);
}

export default leagueSaga;