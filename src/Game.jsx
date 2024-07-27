import React, { useState } from 'react';

const Game = ({ quitGame }) => {
  const [log, setLog] = useState(['Game started!']);
  const [playerHP, setPlayerHP] = useState(100);

  const handleAction = (action) => {
    if (action === 'attack') {
      setLog([...log, 'You attack the enemy!']);
    } else if (action === 'heal') {
      setLog([...log, 'You heal yourself!']);
      setPlayerHP(playerHP + 10);
    }
  };

  return (
    <div>
      <h2>Player Menu</h2>
      <p>Player HP: {playerHP}</p>
      <button onClick={() => handleAction('attack')}>Attack</button>
      <button onClick={() => handleAction('heal')}>Heal</button>
      <button onClick={quitGame}>Quit Game</button>
      <div>
        <h3>Log</h3>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;