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
        <div id="league-details-page">
            <h3 id="league-name">{userLeague.leagueInfo.league_name}</h3>
            {user.id == userLeague.leagueInfo.owner_id ?
                <button 
                className='sub-btn'
                onClick={()=>history.push(`/leagueadmin/${leagueId}`)}
                >Admin Page</button> :
                <></>
            }
            <div>
                <h4 className='details-subtitle'>Tournaments:</h4>
                {userLeague.tournamentsInfo.length == 0 ?
                <h5 className='details-third-level'>No Tournaments Yet</h5>:
                userLeague.tournamentsInfo.map((tournament)=>{
                    return(
                        <div className="tournament-info" key={tournament.id}>
                            <h5 className='details-third-level'>{tournament.tournament_name}</h5>
                        </div>
                    )
                })}
            </div>
            <hr/>
            <div>
                <h4 className='details-subtitle'>Teams:</h4>
                {userLeague.teamsInfo.map((team)=>{
                    return(
                        <div className='details-third-level' key={team.id}>
                            <h5 onClick={()=>history.push(`/teamdetails/${leagueId}/${team.id}`)}>{team.team_name}</h5>
                        </div>
                    )
                })}
            </div>
            <hr/>
            <div>
                <h4 className='details-subtitle'>Players:</h4>
                {userLeague.usersInfo.map((user)=>{
                    return(
                        <div className='details-third-level' key={user.id}>
                            <h5>{user.first_name + " " + user.last_name}</h5>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LeagueDetails;