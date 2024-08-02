import React, { createContext, useState, useContext, useCallback } from 'react';
import { growthCoefficients } from './EnemyData';  // Import growth coefficients

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

// Base stats for different jobs (level 1)
const baseCharacterStats = {
  warrior: { hp: 120, en: 60, mag: 30, ar: 10, mres: 8, str: 17, int: 8, crit: 6, eva: 6, acc: 8, agi: 10 },
  witch: { hp: 80, en: 30, mag: 100, ar: 5, mres: 8, str: 8, int: 12, crit: 8, eva: 8, acc: 7, agi: 10 },
  rogue: { hp: 100, en: 80, mag: 40, ar: 8, mres: 6, str: 14, int: 8, crit: 10, eva: 14, acc: 12, agi: 15 },
  cleric: { hp: 90, en: 40, mag: 80, ar: 5, mres: 10, str: 10, int: 12, crit: 6, eva: 8, acc: 8, agi: 12 },
  paladin: { hp: 110, en: 50, mag: 50, ar: 12, mres: 10, str: 17, int: 8, crit: 5, eva: 5, acc: 6, agi: 5 },
  ranger: { hp: 90, en: 70, mag: 40, ar: 8, mres: 6, str: 10, int: 10, crit: 10, eva: 14, acc: 12, agi: 15 },
};

// Calculate stats based on level and growth coefficients
const calculateStats = (base, level) => {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  
  return {
    hp: Math.round(base.hp * Math.pow(growthCoefficients.hp || 1, level - 1)),
    en: Math.round(base.en * Math.pow(growthCoefficients.en || 1, level - 1)),
    mag: Math.round(base.mag * Math.pow(growthCoefficients.mag || 1, level - 1)),
    ar: Math.round(base.ar * Math.pow(growthCoefficients.ar || 1, level - 1)),
    mres: Math.round(base.mres * Math.pow(growthCoefficients.mres || 1, level - 1)),
    str: Math.round(base.str * Math.pow(growthCoefficients.str || 1, level - 1)),
    int: Math.round(base.int * Math.pow(growthCoefficients.int || 1, level - 1)),
    crit: Math.round(base.crit * Math.pow(growthCoefficients.crit || 1, level - 1)),
    eva: Math.round(base.eva * Math.pow(growthCoefficients.eva || 1, level - 1)),
    acc: Math.round(base.acc * Math.pow(growthCoefficients.acc || 1, level - 1)),
    agi: Math.round(base.agi * Math.pow(growthCoefficients.agi || 1, level - 1)),
  };
};

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({
    name: '',
    sex: '',
    job: '',
    level: 1,
    baseStats: {},  // Store base stats separately
    stats: {},      // Store current stats
  });

  const [isCharacterCreated, setIsCharacterCreated] = useState(false);

  const handleCharacterCreation = useCallback((name, job, sex) => {
    const baseStats = baseCharacterStats[job];
    const stats = calculateStats(baseStats, 1); // Initialize stats at level 1
    setCharacter({ name, job, sex, level: 1, baseStats, stats });
    setIsCharacterCreated(true);  // Set the flag to true when character is created
  }, []);

  const levelUp = useCallback(() => {
    const newLevel = character.level + 1;
    const baseStats = character.baseStats;
    const stats = calculateStats(baseStats, newLevel);
    setCharacter(prev => ({ ...prev, level: newLevel, stats }));
  }, [character.baseStats, character.level]);

  return (
    <CharacterContext.Provider value={{ character, isCharacterCreated, handleCharacterCreation, levelUp }}>
      {children}
    </CharacterContext.Provider>
  );
};
