import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './LeagueDetails.css';

// Component showing details of the league
function LeagueDetails(){
    const history = useHistory();
    const dispatch = useDispatch();
    const leagueId = useParams().leagueid;
    const user = useSelector(store=>store.user);
    const userLeague = useSelector(store=>store.userLeague);

    useEffect(()=>{
        dispatch({
            type: "FETCH_LEAGUE", payload: {id: leagueId}
        });
    }, []);

    return(
        <div>
            <h3>{userLeague.league_name}</h3>
            {user.id == userLeague.owner_id ?
                <button 
                className='sub-btn'
                onClick={()=>history.push(`/leagueadmin/${leagueId}`)}
                >Admin Page</button> :
                <></>
            }
        </div>
    )
}

export default LeagueDetails;