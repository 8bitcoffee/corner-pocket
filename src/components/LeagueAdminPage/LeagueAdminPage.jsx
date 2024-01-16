import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './LeagueAdminPage.css';

// Component showing admin functions for league owner
function LeagueAdminPage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const leagueId = useParams().leagueid;
    const user = useSelector(store=>store.user);
    const userLeague = useSelector(store=>store.userLeague);

    useEffect(()=>{
        dispatch({type: "FETCH_LEAGUE", payload: {id: leagueId}});
    }, []);

    if (user.id == userLeague.leagueInfo.owner_id){
        return(
            <div>
                <h3>{userLeague.league_name}</h3>
                <button 
                    className='sub-btn'
                    onClick={()=>history.push(`/leagueadmin/${leagueId}/createtournament`)}
                >Create Tournament</button>
            </div>
        )
    }
    else {
        return(
            <div>
                <h3>Permission Denied</h3>
            </div>
        )
    }
}

export default LeagueAdminPage;