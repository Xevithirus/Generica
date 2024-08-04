// App.jsx
import React from 'react';
import Game from './Game';
import CharacterCreationForm from './CharacterCreationForm';
import { useCharacter } from './CharacterContext';

const App = () => {
  const { isCharacterCreated } = useCharacter();

  return (
    <div className="app">
      {isCharacterCreated ? <Game /> : <CharacterCreationForm />}
    </div>
  );
};

export default App;