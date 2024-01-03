import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createLeague(action){
    try {
        yield axios.post(`/api/league/`, action.payload);
        const response = yield axios.get(`/api/league/${action.payload.owner_id}`)
        yield put({type: "SET_LEAGUES", payload: response.data});
    }
    catch (error) {
        console.error("Error creating league.", error);
    }
}

function* createLeagueSaga (){
    yield takeLatest("CREATE_LEAGUE", createLeague);
}

export default createLeagueSaga;