import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './TeamPage.css';

// Shows team roster with some base stats.
// Clicking on player opens player detail view
function TeamPage(){
    const dispatch = useDispatch();
    const teamId = useParams().teamid;
    const userTeam = useSelector(store=>store.userTeam);

    useEffect(() => {
        dispatch({type: 'FETCH_LEAGUES'});
        dispatch({type: "FETCH_TEAMS"});
        dispatch({type: "FETCH_TEAM", payload: {id: teamId}})
    }, []);

    return(
        <div>
            <h3>{userTeam.team_name}</h3>
            <h5>Join code - {userTeam.join_code}</h5>
            <h5>Roster:</h5>
            <ul>
                {userTeam.map((user)=>{
                    return(
                        <li key={user.id}>{user.first_name + " " + user.last_name}</li>
                )})}
            </ul>
        </div>
    )
}

export default TeamPage;