// CharacterContext.jsx
import React, { createContext, useState, useContext } from 'react';
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
  return {
    hp: Math.round(base.hp * Math.pow(growthCoefficients.hp, level - 1) * (0.9 + Math.random() * 0.2)),
    mag: Math.round(base.mag * Math.pow(growthCoefficients.mag, level - 1) * (0.9 + Math.random() * 0.2)),
    ap: Math.round(base.ap * Math.pow(growthCoefficients.ap, level - 1) * (0.9 + Math.random() * 0.2)),
    ar: Math.round(base.ar * Math.pow(growthCoefficients.ar, level - 1) * (0.9 + Math.random() * 0.2)),
    mres: Math.round(base.mres * Math.pow(growthCoefficients.mres, level - 1) * (0.9 + Math.random() * 0.2)),
    agi: Math.round(base.agi * Math.pow(growthCoefficients.agi, level - 1) * (0.9 + Math.random() * 0.2)),
    acc: Math.round(base.acc * Math.pow(growthCoefficients.acc, level - 1) * (0.9 + Math.random() * 0.2)),
    eva: Math.round(base.eva * Math.pow(growthCoefficients.eva, level - 1) * (0.9 + Math.random() * 0.2)),
    crit: Math.round(base.crit * Math.pow(growthCoefficients.crit, level - 1) * (0.9 + Math.random() * 0.2)),
    en: Math.round(base.en * Math.pow(growthCoefficients.en, level - 1) * (0.9 + Math.random() * 0.2)),
  };
};

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
    const baseStats = baseCharacterStats[job];
    const stats = calculateStats(baseStats, 1); // Initialize stats at level 1
    setCharacter({ name, job, sex, level: 1, stats });
    setIsCharacterCreated(true);  // Set the flag to true when character is created
  };

  const levelUp = () => {
    const newLevel = character.level + 1;
    const baseStats = baseCharacterStats[character.job];
    const stats = calculateStats(baseStats, newLevel);
    setCharacter(prev => ({ ...prev, level: newLevel, stats }));
  };

  return (
    <CharacterContext.Provider value={{ character, isCharacterCreated, handleCharacterCreation, levelUp }}>
      {children}
    </CharacterContext.Provider>
  );
};