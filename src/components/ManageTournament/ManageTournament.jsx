import React from 'react';
import './ManageTournament.css';

function ManageTournament(){
    
    const generateRoundRobinSchedule = (numTeams, numRounds) => {
        const initNumTeams = numTeams;
        if (numTeams % 2 !== 0) {
            // If the number of teams is odd, add a dummy team for a bye
            numTeams++;
        }
    
        const teams = Array.from({ length: numTeams }, (_, index) => index + 1);
        const schedule = {};
    
        for (let week = 1; week <= numRounds; week++) {
            const matchups = [];
            for (let i = 0; i < numTeams / 2; i++) {
                let team1 = teams[i];
                let team2 = teams[numTeams - 1 - i];
                if (team1 == initNumTeams + 1){
                    team1 = "bye";
                }
                if (team2 == initNumTeams + 1){
                    team2 = "bye";
                }
                if (week % 2 == 1){
                    matchups.push([team1, team2]);
                }
                else{
                    matchups.push([team2, team1]);
                }
            }
            schedule[week] = matchups;
    
            // Rotate teams for the next week
            teams.splice(1, 0, teams.pop());
        }
    
        return schedule;
    }
    
    // Examples
    const numberOfTeams = 11;
    const numberOfWeeks = 16;
    const roundRobinSchedule = generateRoundRobinSchedule(numberOfTeams, numberOfWeeks);
    console.log(roundRobinSchedule);
    console.log(generateRoundRobinSchedule(12,16));
    
    
    

    return(
        <div>

        </div>
    )
}

export default ManageTournament;