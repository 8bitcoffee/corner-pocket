import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CreateTeam.css';

// Form for creating a team inside an already created league
function CreateTeam(){
    const codeLength = 6; //Change this to change length of code change in future
    const history = useHistory();
    const dispatch = useDispatch();
    const [teamName, setTeamName] = useState("");
    const league_id = useParams().id;

    // TODO: Change to uuid with code expiration rather than random unlimited
    const createJoinCode = (length) =>{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const joinCode = createJoinCode(codeLength);
        let action = {
            type: "CREATE_TEAM",
            payload: {
                team_name: teamName,
                league_id: league_id,
                join_code: joinCode
            }
        }
        dispatch(action);
        setTeamName("");
        history.push('/homepage');
    }
    
    return(
        <div>
            <img id="landing-logo" src={'./img/corner-pocket_624x624.png'} alt={'logo'}/>
            <br/><br/>
            <form id="create-team-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={teamName}
                    onChange={(e)=>setTeamName(e.target.value)}
                    placeholder='Team Name'
                />
                <br/><br/>
                <button
                    type="submit"
                    className='sub-btn'
                >Create Team</button>
            </form>
        </div>
    )
}

export default CreateTeam;