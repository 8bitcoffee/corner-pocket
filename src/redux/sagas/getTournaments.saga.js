import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTournaments(action){
    try {
        const response = yield axios.get(`/api/tournament`);
        yield put({type: "SET_TOURNAMENTS", payload: response.data});
    }
    catch (error) {
        console.error("Error GET tournaments.", error);
    }
}

function* getTournamentsSaga (){
    yield takeLatest("FETCH_TOURNAMENTS", getTournaments);
}

export default getTournamentsSaga;