import React from 'react';
import './LeagueList.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LeagueList(){
    const history = useHistory();
    const userLeague = useSelector(store=>store.userLeague);
    const userTeam = useSelector(store=>store.userTeam);

    return(
        <div id='league-list'>
            <h3>Leagues:</h3>
                {userLeague.map((league) => {return(
                    <div key={league.id}>
                        <h5
                            className="league-list-item"
                        >{league.league_name}
                        </h5>
                            <div className='league-list-details'>
                                {userTeam[league.id] == null ? 
                                    <div>
                                        <p className='team-info'>No team joined</p>
                                        {/* {league.team_openings > 0 ?  */}
                                         <button className='sub-btn' onClick={()=>history.push(`/createteam/${league.id}`)}>Create Team</button>
                                        {/* // } */}
                                        <br/><br/>
                                        <button className='sub-btn'>Join Team</button>
                                    </div>
                                    :
                                    <p
                                        onClick={history.push(`/teamdetails/${userTeam[league.id].team_id}`)}
                                        className='team-info'
                                    >{userTeam[league.id].league_name}</p>
                                }
                            </div>
                    </div>
                )})}
        </div>
    )
}

export default LeagueList;