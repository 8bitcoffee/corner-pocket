import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ManageTournament.css';

function ManageTournament(){
    const dispatch = useDispatch();
    const tournamentId = useParams().tournamentid;
    const userTournament = useSelector(store=>store.userTournament);
    const userTournamentInfo = useSelector(store=>store.userTournamentInfo);
    const [tournamentWeek, setTournamentWeek] = useState("");

    useEffect(() => {
        dispatch({type: "FETCH_TOURNAMENT", payload: {id: tournamentId}});
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
                        <th>Home Team</th>
                        <th>Winner</th>
                        <th>Loser</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {userTournament[tournamentWeek].map((matchup) => {
                            return(
                                <tr>
                                    <td>{matchup.away_team_id}</td>
                                    <td>{matchup.home_team_id}</td>
                                    <td>{
                                        matchup.winning_team_id == null ?
                                        " - " : matchup.winning_team_id}
                                    </td>
                                    <td>{
                                        matchup.losing_team_id == null ?
                                        " - " : matchup.losing_team_id}
                                    </td>
                                    <td><button className='sub-btn'>Edit</button></td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <br/><br/>
            <button id="reschedule-btn" className='btn'>Set New Date</button>
            </div>}
        </div>
    )
}

export default ManageTournament;

