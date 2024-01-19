import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTournament(action){

    const groupByDate = (data) =>{
        let retObject = {};
        for (let i=0; i<data.length; i++){
            let date = data[i].date.slice(0,10);
            if (retObject.hasOwnProperty(date)){
                retObject[date].push(data[i]);
            }
            else{
                retObject[date] = [];
                retObject[date].push(data[i]);
            }
        }
        return retObject;
    }

    const getTournamentInfo = (data) => {
        let keys = Object.keys(data);
        let retObject = {};
        retObject.id = data[keys[0]][0].id;
        retObject.name = data[keys[0]][0].tournament_name;
        retObject.num_matchups = keys.length;
        retObject.start_date = keys[0];
        retObject.end_date =  keys[keys.length - 1];
        return retObject;
    }

    try {
        const response = yield axios.get(`/api/match/tournament/${action.payload.id}`);
        const tournamentByDate = groupByDate(response.data);
        yield put({type: "SET_TOURNAMENT_INFO", payload: getTournamentInfo(tournamentByDate)});
        yield put({type: "SET_TOURNAMENT", payload: tournamentByDate});
    }
    catch (error) {
        console.error("Error GET tournaments.", error);
    }
}

function* getTournamentSaga (){
    yield takeLatest("FETCH_TOURNAMENT", getTournament);
}

export default getTournamentSaga;