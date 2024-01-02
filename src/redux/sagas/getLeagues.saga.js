import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getLeagues(id){
    try {
        const response = yield axios.get(`api/league/${id}`);
        yield put({type: "SET_LEAGUES", payload: response.data});
    }
    catch (error) {
        console.error("Error fetching league info", error);
    }
}

function* leaguesSaga (){
    yield takeLatest("FETCH_LEAGUES", getLeagues);
}

export default leaguesSaga;