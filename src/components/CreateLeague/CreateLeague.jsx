import React from 'react';
import { useState, useEffect } from 'react';
import './CreateLeague.css';
import { useDispatch, useSelector } from 'react-redux';

// Detailed stats view of a player. Opened when a player is selected
function CreateLeague(){
    const dispatch = useDispatch();
    const [leagueName, setLeagueName] = useState("");
    const [numTeams, setNumTeams] = useState("");
    const [activity, setActivity] = useState("");
    const activities = useSelector(store=>store.activities);
    const user = useSelector(store=>store.user);
    const [createLeagueError, setCreateLeagueError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        setCreateLeagueError("");
        if (Number(numTeams) < 2){
            return setCreateLeagueError("Teams must be two or more");
        }
        else if (Number(numTeams) > 24){
            return setCreateLeagueError("Number of teams must be 24 or less");
        }
        else if(Number.isInteger(Number(numTeams)) == false){
            return setCreateLeagueError("Need to have a whole team. No decimals.")
        }
        else{
            dispatch({type: "CREATE_LEAGUE", payload: {
                league_name: leagueName,
                activity_id: activity,
                number_of_teams: numTeams,
                owner_id: user.id
            }});
            setCreateLeagueError("");
            setLeagueName("");
            setNumTeams("");
            setActivity("");
        }
    }

    useEffect(() => {
        dispatch({type: 'FETCH_ACTIVITIES'});
    }, [dispatch]);

    return(
        <div>
            <h3 id="create-league-title">Create League</h3>
            <div>{createLeagueError}</div>
            <form id="create-league-form" onSubmit={handleSubmit}>
                <label htmlFor='league-name'>
                    League Name:
                    <input
                        type="text"
                        name="league-name"
                        value={leagueName}
                        onChange={(e)=>setLeagueName(e.target.value)}
                        placeholder='Name'
                    />
                </label>
                <br/>
                <label htmlFor='activity-name'>
                    Activity:
                    <select
                        name="activity-name"
                        value={activity}
                        onChange={(e)=>setActivity(e.target.value)}
                    >
                        <option
                            value=""
                            disabled
                        >Select</option>

                        {activities.map((activity) => {
                            return(
                                <option 
                                    key={activity.id}
                                    value={activity.id}
                                >{activity.activity}</option>
                            )
                        })}
                        
                    </select>
                </label>
                <br/>
                <label htmlFor='num-teams'>
                    Number of Teams:
                    <input
                        type="number"
                        name="num-teams"
                        value={numTeams}
                        onChange={(e)=>setNumTeams(e.target.value)}
                        placeholder='Min 2 - Max 24'
                    />
                </label>
                <br/><br/>
                <button className='btn' id="create-league-btn" type='submit'>Create League</button>
            </form>
        </div>
    )
}

export default CreateLeague;