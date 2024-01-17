import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './JoinLeague.css';

// Form component for joining a league
function JoinLeague(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [joinCode, setJoinCode] = useState("");
    const user = useSelector(store=>store.user);
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch({type: "JOIN_LEAGUE", payload: {user: user, code: joinCode}});
        history.push('/homepage');
    };

    const handleChange = (e) => {
        setJoinCode(e.target.value);
    };

    // TODO: If join code syntax changes, the maxLength on input needs to be changed as well.
    return(
        <div id="join-league-page">
            <img id="landing-logo" src={'./img/corner-pocket_624x624.png'} alt={'logo'}/>
            <br/>
            <form id="join-league-form" onSubmit={handleSubmit}>
                <label htmlFor="code-input">Enter Code (case-sensative)</label>
                <br/><br/>
                <input
                    name="code-input"
                    type="text"
                    value={joinCode}
                    onChange={handleChange}
                    placeholder='Enter Code'
                    maxLength={6}
                ></input>
                <br/><br/>
                <button className='btn'>Join League</button>
            </form>
        </div>
    )
}

export default JoinLeague;