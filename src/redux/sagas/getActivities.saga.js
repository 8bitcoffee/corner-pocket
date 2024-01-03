import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getActivities(){
    try {
        const response = yield axios.get(`api/activity/`);
        yield put({type: "SET_ACTIVITY", payload: response.data});
    }
    catch (error) {
        console.error("Error fetching activity info", error);
    }
}

function* activitiesSaga (){
    yield takeLatest("FETCH_ACTIVITIES", getActivities);
}

export default activitiesSaga;