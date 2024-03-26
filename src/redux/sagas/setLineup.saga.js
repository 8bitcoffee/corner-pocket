import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setLineup(action){
    try {
        for (let player of action.payload)
        yield axios.post(`/api/team/`, action.payload);
        const response = yield axios.get(`/api/team/`);
        yield put({type: "SET_TEAMS", payload: response.data});
    }
    catch (error) {
        console.error("Error creating league.", error);
    }
}

function* setLineupSaga (){
    yield takeLatest("SET_LINEUP", setLineup);
}

export default setLineupSaga;