import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './TeamPage.css';

// Shows team roster with some base stats.
// Clicking on player opens player detail view
function TeamPage(){
    const dispatch = useDispatch();
    const teamId = useParams().teamid;
    const userTeam = useSelector(store=>store.userTeam);

    const copyCode = () => {
        let joinCode = userTeam.teamInfo.join_code;
        let alertField = document.getElementById("copy-alert");
        navigator.clipboard.writeText(joinCode);
        alertField.innerHTML = "Code copied to clipboard";
        setTimeout(()=>{alertField.innerHTML = ""}, 3000)
    }

    useEffect(() => {
        dispatch({type: "FETCH_TEAM", payload: {id: teamId}});
        dispatch({type: 'FETCH_LEAGUES'});
        dispatch({type: "FETCH_TEAMS"});
    }, []);
    
    return(
        <div id="team-details-div">
            <h3 id="team-name">{userTeam.teamInfo.team_name}</h3>
            <h4>Join code - {userTeam.teamInfo.join_code} <ContentCopyIcon fontSize="small" id="copy-icon" onClick={copyCode}/></h4>
            <p id="copy-alert"></p>
            <h4>Roster:</h4>
            <ul>
                {userTeam.roster.map((user)=>{
                    return(
                        <li key={user.id}>{user.first_name + " " + user.last_name}</li>
                )})}
            </ul>
            <br></br>
            <h4>Next Matchup:</h4>
            {userTeam.matchups.length == 0 ?
                (<h5 className='details-subtitle' id="match-details">No Matchups scheduled</h5>):
                (<div>
                    <h5>{userTeam.nextOpponentInfo.date}</h5>
                    <h5 className='details-subtitle' id="match-details">{`${userTeam.nextOpponentInfo.away_team_name} vs. ${userTeam.nextOpponentInfo.home_team_name}`}</h5>
                </div>)}
        </div>
    )
}

export default TeamPage;