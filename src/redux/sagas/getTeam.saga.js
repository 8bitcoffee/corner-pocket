import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeam(action){
    try {
        const response = yield axios.get(`/api/team/${action.payload.id}`);
        yield put({type: "SET_TEAM", payload: response.data});
    }
    catch (error) {
        console.error("Error fetching team info", error);
    }
}

function* teamSaga(){
    yield takeLatest("FETCH_TEAM", getTeam);
}

export default teamSaga;