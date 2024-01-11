import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createTournament(action){
    try {
        yield axios.post(`/api/league/tournament`, action.payload);
        const response = yield axios.get(`/api/league/tournament`);
        yield put({type: "SET_TOURNAMENTS", payload: response.data});
    }
    catch (error) {
        console.error("Error creating tournament.", error);
    }
}

function* createTournamentSaga (){
    yield takeLatest("CREATE_TOURNAMENT", createTournament);
}

export default createTournamentSaga;