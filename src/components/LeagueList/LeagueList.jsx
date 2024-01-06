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
            <img id="landing-logo" src={'./img/corner-pocket_624x624.png'} alt={'logo'}/>
            <h1>Leagues:</h1>
                {userLeague.map((league) => {return(
                    <div key={league.id}>
                        <h3
                            className="league-list-item"
                        >{league.league_name}
                        </h3>
                            <div className='league-list-details'>
                                {league.user_team_id == null ? 
                                    <div>
                                        <p className='team-info'>No team joined</p>
                                        {Number(league.number_of_teams) - Number(league.teams_joined) > 0 ? 
                                         <button className='sub-btn' onClick={()=>history.push(`/createteam/${league.league_id}`)}>Create Team</button>
                                         : <></>
                                        }               
                                        <br/><br/>
                                        <button className='sub-btn'>Join Team</button>
                                    </div>
                                    :
                                    <p
                                        onClick={()=>history.push(`/teamdetails/${league.id}/${league.user_team_id}`)}
                                        className='team-info'
                                    >{league.user_team_name}</p>
                                }
                            </div>
                    </div>
                )})}
        </div>
    )
}

export default LeagueList;