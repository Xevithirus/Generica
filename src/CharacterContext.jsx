import React, { createContext, useState, useContext } from 'react';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({
    name: '',
    sex: '',
    job: '',
    level: 1,
    stats: {},
  });
  const [isCharacterCreated, setIsCharacterCreated] = useState(false);

  const handleCharacterCreation = (name, job, sex) => {
    const stats = initializeStats(job);
    setCharacter({ name, job, sex, level: 1, stats });
    setIsCharacterCreated(true);  // Set the flag to true when character is created
  };

  const initializeStats = (job) => {
    const jobStats = {
      warrior: { hp: 120, eng: 80, mag: 0, str: 30, agi: 20, int: 10 },
      witch: { hp: 70, eng: 50, mag: 80, str: 10, agi: 20, int: 30 },
      rogue: { hp: 90, eng: 70, mag: 10, str: 20, agi: 30, int: 20 },
      cleric: { hp: 80, eng: 60, mag: 70, str: 15, agi: 20, int: 25 },
    };
    return jobStats[job];
  };

  return (
    <CharacterContext.Provider value={{ character, isCharacterCreated, handleCharacterCreation }}>
      {children}
    </CharacterContext.Provider>
  );
};
