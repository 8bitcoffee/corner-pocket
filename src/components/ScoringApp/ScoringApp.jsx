import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SetLineup from '../SetLineup/SetLineup.jsx';
import './ScoringApp.css';

// Base component for the scoring app
// SetLineup, MatchView, and RoundView are all rendered from this component
function ScoringApp(){
    const userTeam = useSelector(store => store.userTeam);
    const dispatch = useDispatch();
    const history = useHistory();
    const matchupId = useParams().matchid;
    const user = useSelector(store=>store.user);
    const userId = user.id;
    const matchup = useSelector(store=>store.userMatchup);
    const homeTeam = matchup.home.id;
    const awayTeam = matchup.away.id;
    const homeCaptain = matchup.home.owner_id;
    const awayCaptain = matchup.away.owner_id;
    const teamId = userTeam.teamInfo.id;

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
    else if(teamId == homeTeam && userId != homeCaptain && matchup.info[0].home_lineup_set == false){
        return (
            <h2>Lineup not yet set. Talk to your captain!</h2>
        )
    }
    else if(teamId == awayTeam && userId != awayCaptain && matchup.info[0].away_lineup_set == false){
        return (
            <h4 id="lineup-not-set">Lineup not yet set. Talk to your captain!</h4>
        )
    }
    
}

export default ScoringApp;