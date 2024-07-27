import React from 'react';

const Menu = ({ startGame }) => {
  return (
    <div>
      <h1>Welcome to Generica</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Menu;