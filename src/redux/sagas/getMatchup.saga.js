import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getMatchup(action){
    try {
        const info = yield axios.get(`/api/match/${action.payload.id}`);
        const rounds = yield axios.get(`/api/match/${action.payload.id}/rounds`);
        const games = yield axios.get(`/api/match/${action.payload.id}/games`);
        const away = yield axios.get(`/api/team/${info.data[0].away_team_id}`);
        const awayRoster = yield axios.get(`/api/team/roster/${info.data[0].away_team_id}`);
        const home = yield axios.get(`/api/team/${info.data[0].home_team_id}`);
        const homeRoster = yield axios.get(`/api/team/roster/${info.data[0].home_team_id}`);
        yield put({type: "SET_MATCHUP", payload: {
            info : info.data,
            rounds: rounds.data,
            games: games.data,
            home: home.data,
            homeRoster: homeRoster.data,
            away: away.data,
            awayRoster: awayRoster.data
        }});
    }
    catch (error) {
        console.error("Error fetching league info", error);
    }
}

function* getMatchupSaga(){
    yield takeLatest("FETCH_MATCHUP", getMatchup);
}

export default getMatchupSaga;