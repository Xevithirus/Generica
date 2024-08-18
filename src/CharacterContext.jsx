// CharacterContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { growthCoefficients } from './EnemyData';  
import { AbilityData } from './AbilityData'; 

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

const baseCharacterStats = {
  warrior: { 
    hp: 150, 
    en: 60, 
    mag: 30, 
    ar: 5, 
    mres: 8, 
    str: 18, 
    int: 10, 
    crit: 5, 
    eva: 5, 
    acc: 8, 
    agi: 6, 
    abilities: ['basicAttack', ,'bandage', 'shieldBash', 'heavyBlow',] 
  },
  witch: { 
    hp: 80, 
    en: 50, 
    mag: 100, 
    ar: 0, 
    mres: 10, 
    str: 10, 
    int: 30, 
    crit: 8, 
    eva: 10, 
    acc: 8, 
    agi: 8, 
    abilities: ['basicAttack', 'shunt', 'burst', 'concuss'] 
  },
  rogue: { 
    hp: 100, 
    en: 100, 
    mag: 30, 
    ar: 2, 
    mres: 5, 
    str: 25, 
    int: 10, 
    crit: 15, 
    eva: 20, 
    acc: 12, 
    agi: 12, 
    abilities: ['basicAttack', 'bandage', 'heavyBlow'] 
  },
  cleric: { 
    hp: 95, 
    en: 50, 
    mag: 100, 
    ar: 0, 
    mres: 12, 
    str: 10, 
    int: 25, 
    crit: 5, 
    eva: 8, 
    acc: 8, 
    agi: 10, 
    abilities: ['basicAttack', 'recover', 'heal'] 
  },
  paladin: { 
    hp: 130, 
    en: 60, 
    mag: 60, 
    ar: 4, 
    mres: 12, 
    str: 20, 
    int: 15, 
    crit: 5, 
    eva: 5, 
    acc: 6, 
    agi: 8, 
    abilities: ['basicAttack', 'recover', 'heavyBlow'] 
  },
  // ranger: { 
  //   hp: 160, 
  //   en: 90, 
  //   mag: 50, 
  //   ar: 2, 
  //   mres: 5, 
  //   str: 20, 
  //   int: 12, 
  //   crit: 15, 
  //   eva: 20, 
  //   acc: 15, 
  //   agi: 12, 
  //   abilities: ['basicAttack', 'bandage', 'heavyBlow'] 
  // },
};

const initialStats = (baseStats) => ({
  maxHp: baseStats.hp,
  currentHp: baseStats.hp,
  maxEn: baseStats.en,
  currentEn: baseStats.en,
  maxMag: baseStats.mag,
  currentMag: baseStats.mag,
  ar: baseStats.ar,
  mres: baseStats.mres,
  str: baseStats.str,
  int: baseStats.int,
  crit: baseStats.crit,
  eva: baseStats.eva,
  acc: baseStats.acc,
  agi: baseStats.agi,
  weaponMultiplier: 1,  
  magicMultiplier: 1    
});

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

const calculateRequiredExperience = (level) => {
  return Math.round(100 * Math.pow(1.5, level - 1));  
};

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({
    name: '',
    sex: '',
    job: '',
    level: 1,
    experience: 0,
    experienceToNextLevel: calculateRequiredExperience(1),
    baseStats: {},  
    stats: {},     
    currentHp: 0,
    currentEn: 0,
    currentMag: 0,
    equipmentBonuses: {},  
    buffMultipliers: {},  
    itemEffectMultipliers: {},  
    abilities: [],  
  });

  const [lastInn, setLastInn] = useState({
    region: 'faldor',
    area: 'darda',
    localPosition: 'townSquare',
    activity: 'inn',
  });

  const [lastGraveyard, setLastGraveyard] = useState({
    region: 'faldor',
    area: 'graveyard',
    localPosition: 'null',
    activity: 'null',
  });

  const [isCharacterCreated, setIsCharacterCreated] = useState(false);

  const handleCharacterCreation = useCallback((name, job, sex) => {
    const baseStats = baseCharacterStats[job];
    const stats = calculateStats(baseStats, 1); 
    console.log('Character Created:', { 
      name, job, sex, baseStats, stats, 
      abilities: baseStats.abilities.filter(ability => AbilityData[ability].requiredLevel <= 1)
    });
    setCharacter({ 
      name, 
      job, 
      sex, 
      level: 1, 
      experience: 0,
      experienceToNextLevel: calculateRequiredExperience(1),
      baseStats, 
      stats, 
      currentHp: stats.maxHp, 
      currentEn: stats.maxEn, 
      currentMag: stats.maxMag,
      abilities: baseStats.abilities.filter(ability => AbilityData[ability].requiredLevel <= 1),
    });
    setIsCharacterCreated(true);  
  }, []);

  const gainExperience = useCallback((exp) => {
    setCharacter(prev => {
      const newExperience = prev.experience + exp;
      if (newExperience >= prev.experienceToNextLevel) {
        const newLevel = prev.level + 1;
        const stats = calculateStats(prev.baseStats, newLevel);
        const newAbilities = prev.baseStats.abilities.filter(ability => 
          AbilityData[ability].requiredLevel <= newLevel && 
          !prev.abilities.includes(ability)
        );
        console.log('Level Up:', { newLevel, stats, newAbilities });
        return {
          ...prev,
          level: newLevel,
          experience: newExperience - prev.experienceToNextLevel,
          experienceToNextLevel: calculateRequiredExperience(newLevel),
          stats,
          currentHp: stats.maxHp,
          currentEn: stats.maxEn,
          currentMag: stats.maxMag,
          abilities: [...prev.abilities, ...newAbilities],
        };
      } else {
        console.log('Experience Gained:', { newExperience });
        return {
          ...prev,
          experience: newExperience,
        };
      }
    });
  }, []);

  const updateLastInn = useCallback((region, area, localPosition, activity) => {
    setLastInn({ region, area, localPosition, activity });
  }, []);

  const updateLastGraveyard = useCallback((region, area, localPosition, activity) => {
    setLastGraveyard({ region, area, localPosition, activity });
  }, []);

  return (
    <CharacterContext.Provider value={{ character, setCharacter, isCharacterCreated, handleCharacterCreation, gainExperience, lastInn, lastGraveyard, updateLastInn, updateLastGraveyard }}>
      {children}
    </CharacterContext.Provider>
  );
};
