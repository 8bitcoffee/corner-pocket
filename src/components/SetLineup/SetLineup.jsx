import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SetLineup.css';
import { useHistory } from 'react-router-dom/';

// Component shown when the lineup for a match is not set
// Captain or league owner can set the lineup
function SetLineup(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const roster = props.roster;
    const team = props.team;
    const info = props.info;

    const [remaining, setRemaining] = useState([...roster])
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [player3, setPlayer3] = useState("");
    const [player4, setPlayer4] = useState("");
    const [player5, setPlayer5] = useState("");
    const [lineup, setLineup] = useState(["","","","",""]);

    function toFindDuplicates(checkArray) {
        let toMap = {};
        let resultToReturn = false;
        for (let i = 0; i < checkArray.length; i++) {
            if (toMap[checkArray[i]]) {
                resultToReturn = true;
                break;
            }
            toMap[checkArray[i]] = true;
        }
    
        return resultToReturn;
    }

    const handleChange = (e) => {
        let slot = e.target.id;
        switch (slot){
            case 'player-1':
                setPlayer1(e.target.value);
                break;
            case 'player-2':
                setPlayer2(e.target.value);
                break;
            case 'player-3':
                setPlayer3(e.target.value);
                break;
            case 'player-4':
                setPlayer4(e.target.value);
                break;
            case 'player-5':
                setPlayer5(e.target.value);
                break;
            default:
                break;
        }

        setLineup([player1,player2,player3,player4,player5])
    }

    const submitLineup = () => {
        if (lineup.includes("")){
            console.log(lineup)
            return alert("All roster positions must be set.");
        }
        else if (toFindDuplicates(lineup)){
            return alert("No duplicates are allowed.");
        }
        else {
            // dispatch({type: "SET_LINEUP", payload: lineup});
            // history.push('/home');
            console.log(lineup);
        }
    }


    return(
        <div>
            <h3 id="team-name">{team.team_name}</h3>
            <h5 id="subtitle">Set Lineup: {info[0].date.slice(0,10)}</h5>
            <div id="set-lineup-input-div">
                <img className='icon' src='./img/icons/01.png'/> Player 1: <select
                    name='player-1'
                    id='player-1'
                    value={player1}
                    onChange={(e)=>handleChange(e)}
                >
                    <option disabled value={""}>Select Player 1</option>
                    {remaining.map((player) => {
                        return(
                            <option key={`${player.id}-1`} value={player.id}>{`${player.first_name} ${player.last_name}`}</option>
                        )
                    })}
                </select><br/><br/>
                <img className='icon' src='./img/icons/02.png'/> Player 2: <select
                    name='player-2'
                    id="player-2"
                    value={player2}
                    onChange={(e)=>handleChange(e)}
                >
                    <option disabled value={""}>Select Player 2</option>
                    {remaining.map((player) => {
                        return(
                            <option key={`${player.id}-2`} value={player.id}>{`${player.first_name} ${player.last_name}`}</option>
                        )
                    })}
                </select><br/><br/>
                <img className='icon' src='./img/icons/03.png'/> Player 3: <select
                    name='player-3'
                    id='player-3'
                    value={player3}
                    onChange={(e)=>handleChange(e)}
                >
                    <option disabled value={""}>Select Player 3</option>
                    {remaining.map((player) => {
                        return(
                            <option key={`${player.id}-3`} value={player.id}>{`${player.first_name} ${player.last_name}`}</option>
                        )
                    })}
                </select><br/><br/>
                <img className='icon' src='./img/icons/04.png'/> Player 4: <select
                    name='player-4'
                    id='player-4'
                    value={player4}
                    onChange={(e)=>handleChange(e)}
                >
                    <option disabled value={""}>Select Player 4</option>
                    {remaining.map((player) => {
                        return(
                            <option key={`${player.id}-4`} value={player.id}>{`${player.first_name} ${player.last_name}`}</option>
                        )
                    })}
                </select><br/><br/>
                <img className='icon' src='./img/icons/05.png'/> Player 5: <select
                    name='player-5'
                    id='player-5'
                    value={player5}
                    onChange={(e)=>handleChange(e)}
                >
                    <option disabled value={""}>Select Player 5</option>
                    {remaining.map((player) => {
                        return(
                            <option key={`${player.id}-5`} value={player.id}>{`${player.first_name} ${player.last_name}`}</option>
                        )
                    })}
                </select><br/><br/>
            </div>
            <br/>
            <button onClick={submitLineup} id="submit-lineup-btn" className='btn'>Set Lineup</button>
        </div>
    )
}

export default SetLineup;