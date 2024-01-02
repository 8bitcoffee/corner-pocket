import React from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import PersonalStats from '../PersonalStats/PersonalStats.jsx';
import TeamStats from '../TeamStats/TeamStats.jsx';
import LeagueStats from '../LeagueStats/LeagueStats.jsx';

// Main page of the app after login
// Will render different component based on league status
function Home(){
    const history = useHistory();
    const userLeague = useSelector(store => store.userLeague);

    const createLeague = () => {
        history.push("/createLeague");
    }

    const joinLeague = () => {
        history.push("/joinLeague");
    }

    if (userLeague.length > 0){
        return(
            <div>
                <PersonalStats/>
                <br/>
                <TeamStats/>
                <br/>
                <LeagueStats/>
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
                <button onClick={joinLeague} className="btn">Join League</button>
            </div>
        )
    }
}

export default Home;