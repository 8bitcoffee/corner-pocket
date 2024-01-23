import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SetLineup from '../SetLineup/SetLineup.jsx';
import './ScoringApp.css';

// Base component for the scoring app
// SetLineup, MatchView, and RoundView are all rendered from this component
function ScoringApp(){
    const dispatch = useDispatch();
    const history = useHistory();
    const matchupId = useParams().matchid;

    const user = useSelector(store=>store.user);
    const userId = user.id;
    const matchup = useSelector(store=>store.userMatchup);
    const homeCaptain = matchup.home.owner_id;
    const awayCaptain = matchup.away.owner_id;


    useEffect(() => {
        dispatch({type: "FETCH_MATCHUP", payload: {id: matchupId}});
    }, []);

    if (userId == homeCaptain && matchup.info[0].home_lineup_set == false){
        
        return(
            <SetLineup team={matchup.home} roster={matchup.homeRoster}/>
        )
    }
    else if(userId == awayCaptain && matchup.info[0].away_lineup_set == false){
        return(
            <SetLineup team={matchup.away} roster={matchup.awayRoster} info={matchup.info}/>
        )
    }
}

export default ScoringApp;