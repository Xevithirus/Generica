import React from 'react';
import { useCharacter } from './CharacterContext';
import CharacterCreationForm from './CharacterCreationForm';
import Game from './Game';

const App = () => {
  const { isCharacterCreated } = useCharacter();

  return (
    isCharacterCreated ? <Game /> : <CharacterCreationForm />
  );
};

export default App;