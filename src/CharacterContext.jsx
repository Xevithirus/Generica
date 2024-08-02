import React, { createContext, useState, useContext, useCallback } from 'react';
import { growthCoefficients } from './EnemyData';  // Import growth coefficients

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

const baseCharacterStats = {
  warrior: { hp: 200, en: 70, mag: 40, ar: 15, mres: 10, str: 20, int: 10, crit: 10, eva: 8, acc: 12, agi: 10 },
  witch: { hp: 120, en: 50, mag: 150, ar: 10, mres: 15, str: 10, int: 20, crit: 12, eva: 10, acc: 10, agi: 12 },
  rogue: { hp: 160, en: 90, mag: 50, ar: 12, mres: 10, str: 18, int: 10, crit: 15, eva: 20, acc: 15, agi: 20 },
  cleric: { hp: 140, en: 60, mag: 120, ar: 10, mres: 18, str: 12, int: 20, crit: 10, eva: 10, acc: 10, agi: 15 },
  paladin: { hp: 180, en: 60, mag: 70, ar: 18, mres: 18, str: 22, int: 10, crit: 8, eva: 8, acc: 10, agi: 10 },
  ranger: { hp: 150, en: 80, mag: 60, ar: 12, mres: 10, str: 15, int: 15, crit: 15, eva: 20, acc: 18, agi: 20 },
};

// Calculate stats based on level and growth coefficients
const calculateStats = (base, level, bonuses = {}) => {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  
  return {
    maxHp: Math.round(base.hp * Math.pow(growthCoefficients.hp || 1, level - 1)),
    maxEn: Math.round(base.en * Math.pow(growthCoefficients.en || 1, level - 1)),
    maxMag: Math.round(base.mag * Math.pow(growthCoefficients.mag || 1, level - 1)),
    ar: Math.round(base.ar * Math.pow(growthCoefficients.ar || 1, level - 1)) + (bonuses.ar || 0),
    mres: Math.round(base.mres * Math.pow(growthCoefficients.mres || 1, level - 1)) + (bonuses.mres || 0),
    str: Math.round(base.str * Math.pow(growthCoefficients.str || 1, level - 1)) + (bonuses.str || 0),
    int: Math.round(base.int * Math.pow(growthCoefficients.int || 1, level - 1)) + (bonuses.int || 0),
    crit: Math.round(base.crit * Math.pow(growthCoefficients.crit || 1, level - 1)) + (bonuses.crit || 0),
    eva: Math.round(base.eva * Math.pow(growthCoefficients.eva || 1, level - 1)) + (bonuses.eva || 0),
    acc: Math.round(base.acc * Math.pow(growthCoefficients.acc || 1, level - 1)) + (bonuses.acc || 0),
    agi: Math.round(base.agi * Math.pow(growthCoefficients.agi || 1, level - 1)) + (bonuses.agi || 0),
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
    currentHp: 0,
    currentEn: 0,
    currentMag: 0,
    equipmentBonuses: {},  // New field for equipment bonuses
    buffMultipliers: {},  // New field for active buff multipliers
    itemEffectMultipliers: {},  // New field for active item effect multipliers
  });

  const [lastInn, setLastInn] = useState({
    region: 'faldor',
    area: 'darda',
    localPosition: 'townSquare',
    activity: 'inn',
  });

  const [isCharacterCreated, setIsCharacterCreated] = useState(false);

  const handleCharacterCreation = useCallback((name, job, sex) => {
    const baseStats = baseCharacterStats[job];
    const stats = calculateStats(baseStats, 1); // Initialize stats at level 1
    setCharacter({ 
      name, 
      job, 
      sex, 
      level: 1, 
      baseStats, 
      stats, 
      currentHp: stats.maxHp, 
      currentEn: stats.maxEn, 
      currentMag: stats.maxMag 
    });
    setIsCharacterCreated(true);  // Set the flag to true when character is created
  }, []);

  const levelUp = useCallback(() => {
    const newLevel = character.level + 1;
    const baseStats = character.baseStats;
    const stats = calculateStats(baseStats, newLevel);
    setCharacter(prev => ({ 
      ...prev, 
      level: newLevel, 
      stats,
      currentHp: stats.maxHp, 
      currentEn: stats.maxEn, 
      currentMag: stats.maxMag 
    }));
  }, [character.baseStats, character.level]);

  const updateLastInn = useCallback((region, area, localPosition, activity) => {
    setLastInn({ region, area, localPosition, activity });
  }, []);

  return (
    <CharacterContext.Provider value={{ character, setCharacter, isCharacterCreated, handleCharacterCreation, levelUp, lastInn, updateLastInn }}>
      {children}
    </CharacterContext.Provider>
  );
};
