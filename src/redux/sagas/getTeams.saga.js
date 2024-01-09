import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeams(){
    try {
        const response = yield axios.get(`/api/team`);
        yield put({type: "SET_TEAMS", payload: response.data});
    }
    catch (error) {
        console.error("Error fetching team info", error);
    }
}

function* teamsSaga(){
    yield takeLatest("FETCH_TEAMS", getTeams);
}

export default teamsSaga;