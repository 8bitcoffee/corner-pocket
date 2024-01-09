import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getLeague(action){
    try {
        const response = yield axios.get(`/api/league/${action.payload.id}`);
        yield put({type: "SET_LEAGUE", payload: response.data});
    }
    catch (error) {
        console.error("Error fetching league info", error);
    }
}

function* leagueSaga(){
    yield takeLatest("FETCH_LEAGUE", getLeague);
}

export default leagueSaga;