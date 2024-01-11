import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './CreateTournament.css';

// Form to create tournamnet
function CreateTournament(){
    const dispatch = useDispatch();
    const history = useHistory();
    const leagueId = useParams().leagueid;
    const [tournamentName, setTournamentName] = useState("");
    const [bracket, setBracket] = useState("");
    const [playoffs, setPlayoffs] = useState("");
    const [playoffNum, setPlayoffNum] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "CREATE_TOURNAMENT",
            payload: {
                tournament_name: tournamentName,
                bracket: bracket,
                playoffs: playoffs,
                playoff_num: playoffNum,
                league_id: leagueId
            }
        });
        history.push(`/leagueadmin/${leagueId}`);
    }

    return(
        <div>
            <img id="landing-logo" src={'./img/corner-pocket_624x624.png'} alt={'logo'}/>
            <h3 id="create-tournament-title">Create Tournament</h3>
            <form onSubmit={handleSubmit} id="create-tournament-form">
                Name: 
                <input 
                    type="text"
                    value={tournamentName}
                    placeholder='Tournament Name'
                    onChange={(e)=>setTournamentName(e.target.value)}
                    maxLength={32}
                />
                <br/>
                Tournament Type: 
                <select 
                    value={bracket} 
                    onChange={(e)=>{setBracket(e.target.value)}}
                >
                    <option
                        disabled
                        value={""}
                    >Select Type</option>
                    <option
                        value={true}
                    >Bracket</option>
                    <option
                        value={false}
                    >Round-Robin</option>
                </select>
                <br/><br/>
                Include Playoffs? 
                <select 
                    value={playoffs} 
                    onChange={(e)=>{setPlayoffs(e.target.value)}}
                >
                    <option
                        disabled
                        value={""}
                    >Playoffs?</option>
                    <option
                        value={true}
                    >Yes</option>
                    <option
                        value={false}
                    >No</option>
                </select>
                <br/><br/>
                Number of playoff teams? 
                <select 
                    value={playoffNum} 
                    onChange={(e)=>{setPlayoffNum(e.target.value)}}
                >
                    <option
                        value={0}
                    >0</option>
                    <option
                        value={2}
                    >2</option>
                    <option
                        value={4}
                    >4</option>
                    <option
                        value={6}
                    >6</option>
                    <option
                        value={8}
                    >8</option>
                </select>
                <br/><br/>
                <button
                    id="create-tournament-btn"
                    className='sub-btn'
                    type='submit'
                >Create Tournament</button>
            </form>
        </div>
    )
}

export default CreateTournament;