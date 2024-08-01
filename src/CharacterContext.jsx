import React, { createContext, useState, useContext, useCallback } from 'react';
import { growthCoefficients } from './EnemyData';  // Import growth coefficients

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

// Base stats for different jobs (level 1)
const baseCharacterStats = {
  warrior: { hp: 160, en: 100, mag: 10, ap: 40, ar: 30, mres: 15, crit: 15, eva: 15, agi: 20, acc: 20 },
  witch: { hp: 100, en: 70, mag: 100, ap: 20, ar: 10, mres: 20, crit: 20, eva: 15, agi: 20, acc: 20 },
  rogue: { hp: 130, en: 85, mag: 15, ap: 30, ar: 20, mres: 15, crit: 25, eva: 25, agi: 35, acc: 30 },
  cleric: { hp: 120, en: 75, mag: 80, ap: 25, ar: 20, mres: 25, crit: 15, eva: 20, agi: 20, acc: 20 },
  paladin: { hp: 140, en: 85, mag: 15, ap: 35, ar: 35, mres: 20, crit: 10, eva: 15, agi: 20, acc: 20 },
  ranger: { hp: 110, en: 80, mag: 15, ap: 30, ar: 15, mres: 15, crit: 20, eva: 25, agi: 35, acc: 35 },
};

// Calculate stats based on level and growth coefficients
const calculateStats = (base, level) => {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  
  return {
    hp: Math.round(base.hp * Math.pow(growthCoefficients.hp || 1, level - 1)),
    mag: Math.round(base.mag * Math.pow(growthCoefficients.mag || 1, level - 1)),
    ap: Math.round(base.ap * Math.pow(growthCoefficients.ap || 1, level - 1)),
    ar: Math.round(base.ar * Math.pow(growthCoefficients.ar || 1, level - 1)),
    mres: Math.round(base.mres * Math.pow(growthCoefficients.mres || 1, level - 1)),
    agi: Math.round(base.agi * Math.pow(growthCoefficients.agi || 1, level - 1)),
    acc: Math.round(base.acc * Math.pow(growthCoefficients.acc || 1, level - 1)),
    eva: Math.round(base.eva * Math.pow(growthCoefficients.eva || 1, level - 1)),
    crit: Math.round(base.crit * Math.pow(growthCoefficients.crit || 1, level - 1)),
    en: Math.round(base.en * Math.pow(growthCoefficients.en || 1, level - 1)),
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
