import React from 'react';
import "./AboutPage.css";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <img id="landing-logo" src={'./img/corner-pocket_624x624.png'} alt={'logo'}/>
      <br/>
      <div>
        <p>Corner pocket is an app designed for those that want verifiable proof that they rock. It's a scoring app
          and organizer for pickup leagues. Designed primarily for Eight-ball billards, the corner pocket can be a spot for any
          type of league to land.
        </p>
        <p>Create, manage, and track your league. Who has the best win record? Easy to find out with live-updated stats.
          Completely open-source, you can customize it to your needs. Have fun!
        </p>
        <p>
          -J
        </p>
        <a href='mailto:j@8bitcoffee'>j@8bit.coffee</a>
      </div>
    </div>
  );
}

export default AboutPage;
