import React, { useState } from 'react';
// import Menu from './Menu.jsx';
// import Game from './Game.jsx';
import Sidebar from './common/Sidebar';
import WorldLocation from './WorldLocation';
import './App.css';

const App = () => {
  // const [gameState, setGameState] = useState('menu'); // 'menu' or 'game'
  const [currentLocation, setCurrentLocation] = useState('darda');

  // const startGame = () => {
  //   setGameState('game');
  // };

  // const quitGame = () => {
  //   setGameState('menu');
  // };

  return (
    // <div>
    //   {gameState === 'menu' ? (
    //     <Menu startGame={startGame} />
    //   ) : (
    //     <Game quitGame={quitGame} />
    //   )}
    // </div>
    <div className="app">
      <Sidebar setCurrentLocation={setCurrentLocation} />
      <div className="location-screen">
        <div className="main-image">
          <img src={locations[currentLocation].image} alt={locations[currentLocation].name} />
        </div>
        <WorldLocation
          location={locations[currentLocation]}
          locations={locations}
          setCurrentLocation={setCurrentLocation}
        />
      </div>
    </div>
  );
};

export default App;

// ----------------------------- LOCATIONS ---------------------------------
const locations = {
  // FALDOR REGION
  darda: {
    name: 'Darda',
    description: 'Welcome to Darda! This quaint little fishing village is nestled in the North-Eastern edge of Faldor. Only the most well-travelled know of its incredible seafood and kind townfolk.',
    image: './images/darda.png',
    nearby: ['theValley'],
  },
  theValley: {
    name: 'The Valley',
    description: "You've arrived at The Valley. Hidden from the world within an unbroken wall of mountains, it is a peaceful green paradise. The wildlife has been well preserved and many interesting animals roam its grassy plains.",
    image: './images/the-valley.png',
    nearby: ['darda', 'coralCove', 'thalenPass'],
  },
  coralCove: {
    name: 'Coral Cove',
    description: "You've arrived at Coral Cove. A beautiful sandy beach boardered by impressive cliff walls.",
    image: './images/coral-cove.png',
    nearby: ['theValley', 'blusterBluffs'],
  },
  blusterBluffs: {
    name: 'Bluster Bluffs',
    description: "You've climbed Bluster Bluffs. Overlooking the Coral Cove, it provides a great view of the sea!",
    image: './images/bluster-bluffs.png',
    nearby: ['coralCove'],
  },
  thalenPass: {
    name: 'Thalen Pass',
    description: "You've arrived at Thalen Pass. This old mining tunnel used to provide throughfare to the world beyond the Westridge Mountains. Alas, it appears to have been sealed for saftey.",
    image: './images/thalen-pass.png',
    nearby: ['theValley'],
  },
};
