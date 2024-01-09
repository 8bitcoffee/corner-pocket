import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LeagueAdminPage from '../AdminPage/LeagueAdminPage';
import './LeagueDetails.css';

// Component showing details of the league
function LeagueDetails(){
    const dispatch = useDispatch();
    const leagueId = useParams().leagueid;
    const user = useSelector(store=>store.user);
    const userLeague = useSelector(store=>store.userLeague);

    useEffect(()=>{
        dispatch({type: "FETCH_LEAGUE", payload: {id: leagueId}});
    }, []);

    if (user.id == userLeague.owner_id){
        return(
            <div>
                <h3>{userLeague.league_name}</h3>
                <LeagueAdminPage/>
            </div>
        )
    }
    else {
        return(
            <div>
                <h3>{userLeague.league_name}</h3>
            </div>
        )
    }
}

export default LeagueDetails;