import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { DateTime } from 'luxon';

function* createTournament(action){
    //--- Schedule population functions

    const generateRoundRobinSchedule = (numTeams, numRounds) => {
        const initNumTeams = numTeams;
        if (numTeams % 2 !== 0) {
            // If the number of teams is odd, add a dummy team for a bye
            numTeams++;
        }
        const teams = Array.from({ length: numTeams }, (_, index) => index + 1);
        const schedule = [];

        for (let week = 0; week < numRounds; week++) {
            const matchups = [];
            for (let i = 0; i < numTeams / 2; i++) {
                let team1 = teams[i];
                let team2 = teams[numTeams - 1 - i];
                if (team1 == initNumTeams + 1){
                    team1 = null; //If playing a dummy team, the team is null
                }
                if (team2 == initNumTeams + 1){
                    team2 = null; //If playing a dummy team, the team is null
                }
                if (week % 2 == 1){
                    matchups.push([team1, team2]); // Alternating home v away
                }
                else{
                    matchups.push([team2, team1]); // Alternating home v away
                }
            }
            schedule[week] = matchups;
            // Rotate teams for the next week
            teams.splice(1, 0, teams.pop());
        }
        return schedule;
    }

    try {
        const payload = action.payload;

        // Removing keys that are empty so DB records as null
        for (let key of Object.keys(payload)){
            if (payload[key] == ""){
                delete payload[key];
            }
        }
        const post_response = yield axios.post(`/api/tournament`, payload);
        const tournament_id = post_response.data;
        const schedule = yield generateRoundRobinSchedule(Number(payload.userLeague.leagueInfo.teams_joined),payload.num_matchups);

        let weekdif = 0;
        for (let week of schedule){
            for (let matchup of week){
                // Setting match time
                let datetimeObj = DateTime.fromISO(payload.start_date);
                let matchupDatetime = datetimeObj.plus({days: weekdif * 7});
                matchupDatetime = matchupDatetime.toISODate();

                // Detecting bye week
                let isBye = false;
                for (let team of matchup){
                    if (team == null){
                        let isBye = true;
                    }
                }

                // Compiling matchup info
                let matchupData = {
                    home_team_id: payload.userLeague.teamsInfo[matchup[0]-1].id,
                    away_team_id: payload.userLeague.teamsInfo[matchup[1]-1].id,
                    bye: isBye,
                    date: matchupDatetime,
                    tournament_id: tournament_id
                }
                console.log(matchupData);
                yield axios.post('/api/match', matchupData);
            }
            weekdif += 1;
        }

        const getResponse = yield axios.get(`/api/tournament/${tournament_id}`);
        yield put({type: "SET_TOURNAMENTS", payload: getResponse.data});
    }
    catch (error) {
        console.error("Error creating tournament.", error);
    }
}

function* createTournamentSaga (){
    yield takeLatest("CREATE_TOURNAMENT", createTournament);
}

export default createTournamentSaga;