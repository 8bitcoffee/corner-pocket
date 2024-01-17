import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import './CreateTournament.css';

// Form to create tournamnet
function CreateTournament(){
    const dispatch = useDispatch();
    const history = useHistory();
    const leagueId = useParams().leagueid;
    const userLeague = useSelector(store=>store.userLeague);
    const [tournamentName, setTournamentName] = useState("");
    const [numOfMatchups, setNumOfMatchups] = useState("");
    const [bracket, setBracket] = useState("");
    const [playoffs, setPlayoffs] = useState("");
    const [playoffNum, setPlayoffNum] = useState("");
    const [bracketNum, setBracketNum] = useState("");
    const [startDate, setStartDate] = useState(DateTime.now().toISODate());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userLeague.leagueInfo.league_name == ""){ // Throws an error if there isn't an accompanying league
            return alert("Error in tournament creation. Try again.");
        }
        dispatch({
            type: "CREATE_TOURNAMENT",
            payload: {
                tournament_name: tournamentName,
                bracket: bracket,
                num_teams: bracketNum,
                num_matchups: numOfMatchups,
                playoffs: playoffs,
                playoff_num: playoffNum,
                league_id: leagueId,
                start_date: startDate,
                userLeague: userLeague
            }
        });
        history.push(`/leagueadmin/${leagueId}`);
    }

    useEffect(()=>{
        dispatch({type: "FETCH_LEAGUE", payload: {id: leagueId}});
    }, []);
    
    // TODO: Add location input via google maps API
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
                    onChange={(e)=>setBracket(e.target.value)}
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
                <br/>
                {bracket == 'true' ? (
                    <div>Num of Teams:
                        <select
                            value={bracketNum}
                            onChange={(e)=>setBracketNum(e.target.value)}>
                            <option
                                value={8}
                            >8</option>
                            <option
                                value={16}
                            >16</option>
                            <option
                                value={32}
                            >32</option>
                            <option
                                value={64}
                            >64</option>
                        </select>
                    </div>
                    ) : (
                    <div>Num of Matchups:
                        <select
                            value={numOfMatchups}
                            onChange={(e)=>setNumOfMatchups(e.target.value)}
                        >
                            <option
                                value={4}
                            >4</option>
                            <option
                                value={6}
                            >6</option>
                            <option
                                value={8}
                            >8</option>
                            <option
                                value={10}
                            >10</option>
                            <option
                                value={12}
                            >12</option>
                            <option
                                value={14}
                            >14</option>
                            <option
                                value={16}
                            >16</option>
                            <option
                                value={18}
                            >18</option>
                            <option
                                value={20}
                            >20</option>
                            <option
                                value={22}
                            >22</option>
                            <option
                                value={24}
                            >24</option>
                        </select>
                        <br/>
                    </div>
                    )
                }
                <br/>
                <label htmlFor="start-date-input">Start Date:</label>
                <input
                    type="date"
                    id="start-date-input"
                    name="start-date-input"
                    value={startDate}
                    onChange={(e)=>setStartDate(e.target.value)}
                />
                <br/>
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