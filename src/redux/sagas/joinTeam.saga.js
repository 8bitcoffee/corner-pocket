import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* joinTeam(action){
    try {
        yield axios.post(`/api/team/join`, action.payload);
    }
    catch (error) {
        console.error("Error joining team", error);
    }
}

function* joinTeamSaga(){
    yield takeLatest("JOIN_TEAM", joinTeam);
}

export default joinTeamSaga;