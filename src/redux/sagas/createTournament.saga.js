import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createTournament(action){
    try {
        const payload = action.payload;
        for (let key of Object.keys(payload)){
            if (payload[key] == ""){
                delete payload[key];
            }
        }
        console.log(payload);
        yield axios.post(`/api/tournament`, payload);
        const response = yield axios.get(`/api/tournament`);
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