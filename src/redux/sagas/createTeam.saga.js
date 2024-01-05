import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createLeague(action){
    try {
        yield axios.post(`/api/team/`, action.payload);
        const response = yield axios.get(`/api/team/`);
        yield put({type: "SET_TEAMS", payload: response.data});
    }
    catch (error) {
        console.error("Error creating league.", error);
    }
}

function* createLeagueSaga (){
    yield takeLatest("CREATE_TEAM", createLeague);
}

export default createLeagueSaga;