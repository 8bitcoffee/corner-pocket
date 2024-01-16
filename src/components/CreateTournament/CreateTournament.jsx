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
    const [numOfRounds, setNumOfRounds] = useState("");
    const [bracket, setBracket] = useState("");
    const [playoffs, setPlayoffs] = useState("");
    const [playoffNum, setPlayoffNum] = useState("");
    const [bracketNum, setBracketNum] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "CREATE_TOURNAMENT",
            payload: {
                tournament_name: tournamentName,
                num_rounds: numOfRounds,
                bracket: bracket,
                playoffs: playoffs,
                playoff_num: playoffNum,
                league_id: leagueId
            }
        });
        history.push(`/leagueadmin/${leagueId}`);
    }

    const handleBracketChange = (e) => {
        setBracket(e.target.value);
        console.log(`bracket: ${e.target.value}`);
    }

    // const renderSwitch = (bracketSetting) =>{
    //     switch(bracketSetting){
    //         case "":
    //             return <></>;
    //         case true:
    //             return (
    //                 <div>Num of Teams:
    //                     <select>
    //                     </select>
    //                 </div>
    //             );
    //         case false:
    //             return(
    //                 <div>
    //                     Num of Weeks:<select>
    //                     </select>
    //                     <br/><br/>
    //                     Include Playoffs? <select 
    //                         value={playoffs} 
    //                         onChange={(e)=>{setPlayoffs(e.target.value)}}
    //                     >
    //                         <option
    //                             disabled
    //                             value={""}
    //                         >Playoffs?</option>
    //                         <option
    //                             value={true}
    //                         >Yes</option>
    //                         <option
    //                             value={false}
    //                         >No</option>
    //                     </select>
    //                 </div>
    //             );
    //     }
    // }

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
                    onChange={handleBracketChange}
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
                <div>Num of Rounds:
                    <select
                        value={numOfRounds}
                        onChange={(e)=>setNumOfRounds(e.target.value)}
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
                    Include Playoffs? <select 
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
                </div>
                <div>
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
                        <option
                            value={10}
                        >10</option>
                        <option
                            value={12}
                        >12</option>
                    </select>
                </div>
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