import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ManageTournament.css';

function ManageTournament(){
    const dispatch = useDispatch();
    const leagueId = useParams().leagueid;
    const tournamentId = useParams().tournamentid;
    const leagueTeams = useSelector(store=>store.leagueTeams);
    const userTournament = useSelector(store=>store.userTournament);
    const userTournamentInfo = useSelector(store=>store.userTournamentInfo);
    const [tournamentWeek, setTournamentWeek] = useState("");

    useEffect(() => {
        dispatch({type: "FETCH_TOURNAMENT", payload: {id: tournamentId}});
        dispatch({type: "FETCH_LEAGUE", payload: {id: leagueId}});
    }, []);

    return(
        <div>
            <h3 id="tournament-name">{userTournamentInfo.name}</h3>
            <br/>
            <div id="week-selector-div">
                Select Week: <select
                    name="week-selector"
                    id="week-selector"
                    value={tournamentWeek}
                    onChange={(e)=>setTournamentWeek(e.target.value)}
                >
                    <option
                        disabled
                        value=""
                    >Choose Week</option>
                    {Object.keys(userTournament).map((week, index)=>{
                        return(
                            <option
                                key={index}
                                value={week}
                            >{`Week ${index + 1} - ${week}`}</option>
                        )
                    })}
                </select>
            </div>
            <br/>
            {tournamentWeek == "" ?
            <div><br/><br/><img id="landing-logo" src={'./img/corner-pocket_624x624.png'} alt={'logo'}/></div>: 
            <div>
            <table id="week-table">
                <thead>
                    <tr>
                        <th>Away Team</th>
                        <th>Score</th>
                        <th>Score</th>
                        <th>Home Team</th>
                    </tr>
                </thead>
                <tbody>
                    {userTournament[tournamentWeek].map((matchup) => {
                            return(
                                <tr key={matchup.id}>
                                    <td>{leagueTeams[matchup.away_team_id].team_name}</td>
                                    <td>{matchup.away_team_total}</td>
                                    <td>{matchup.home_team_total}</td>
                                    <td>{leagueTeams[matchup.home_team_id].team_name}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <br/><br/>
            <button id="edit-week-btn" className='btn'>Edit Week</button>
            <br/>
            </div>}
        </div>
    )
}

export default ManageTournament;

