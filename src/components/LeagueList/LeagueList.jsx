import React from 'react';
import './LeagueList.css';
import { useSelector } from 'react-redux';

function LeagueList(){
    const userLeague = useSelector(store=>store.userLeague);

    return(
        <div>
            <ul>
                {userLeague.map((league) => {return(
                    <li
                        className="league-list-item"
                        key={league.id}
                    >{league.league_name}</li>
                )})}
            </ul>
        </div>
    )
}

export default LeagueList;