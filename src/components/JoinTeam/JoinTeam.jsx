import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './JoinTeam.css';

// Component showing details of the league
function JoinTeam(){
    const dispatch = useDispatch();
    const [joinCode, setJoinCode] = useState("");
    const user = useSelector(store=>store.user);
    const userLeague = useSelector(store=>store.userLeague);

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch({type: "JOIN_TEAM", payload: {user: user, code: joinCode}});
    };

    const handleChange = (e) => {
        setJoinCode(e.target.value);
    };

    // TODO: If join code syntax changes, the maxLength on input needs to be changed as well.
    return(
        <div>
            <img id="landing-logo" src={'./img/corner-pocket_624x624.png'} alt={'logo'}/>
            <br/>
            <form id="join-team-form" onSubmit={handleSubmit}>
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
                <button className='btn'>Join Team</button>
            </form>
        </div>
    )
}

export default JoinTeam;