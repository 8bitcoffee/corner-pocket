import React, { useEffect } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import LeagueList from '../LeagueList/LeagueList.jsx';

// Main page of the app after login
// Will render different component based on league status
function Home(){
    const dispatch = useDispatch();
    const history = useHistory();
    const userLeagues = useSelector(store => store.userLeagues);

    useEffect(() => {
        dispatch({type: 'FETCH_LEAGUES'});
        dispatch({type: "FETCH_TEAMS"})
    }, []);

    const createLeague = () => {
        history.push("/createLeague");
    }

    const joinTeam = () => {
        history.push("/joinTeam");
    }

    if (userLeagues.length > 0){
        return(
            <div>
                <LeagueList/>
                <br/>
                <br/>
                <button id="join-team-btn" onClick={joinTeam} className="btn">Join Team</button>
            </div>
        )
    }
    else {
        return(
            <div id="create-join-btns">
                <img id="landing-logo" src={'./img/corner-pocket_624x624.png'} alt={'logo'}/>
                <br/><br/>
                <button onClick={createLeague} className="btn">Create League</button>
                <br/><br/>
                <button onClick={joinTeam} className="btn">Join Team</button>
            </div>
        )
    }
}

export default Home;