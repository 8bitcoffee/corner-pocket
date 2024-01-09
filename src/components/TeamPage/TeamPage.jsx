import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './TeamPage.css';

// Shows team roster with some base stats.
// Clicking on player opens player detail view
function TeamPage(){
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({type: 'FETCH_LEAGUES'});
        dispatch({type: "FETCH_TEAMS"})
    }, []);

    return(
        <div>
            <div>

            </div>
        </div>
    )
}

export default TeamPage;