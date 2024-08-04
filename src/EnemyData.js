// EnemyData.js
const assignAbilities = (enemy, level) => {
  const availableAbilities = enemy.possibleAbilities.filter(ability => AbilityData[ability].requiredLevel <= level);
  return availableAbilities;
};

// Base stats for level 1 enemies
export const baseStats = {
  GreenSlime: { maxHp: 50, currentHp: 50, maxEn: 10, currentEn: 10, maxMag: 10, currentMag: 10, ar: 2, mres: 2, str: 10, int: 8, crit: 3, eva: 5, acc: 7, agi: 5, expReward: 15 },
  BlueSlime: { maxHp: 55, currentHp: 55, maxEn: 10, currentEn: 10, maxMag: 15, currentMag: 15, ar: 2, mres: 4, str: 8, int: 10, crit: 4, eva: 8, acc: 7, agi: 6, expReward: 18 },
  Velyr: { maxHp: 60, currentHp: 60, maxEn: 15, currentEn: 15, maxMag: 20, currentMag: 20, ar: 1, mres: 5, str: 8, int: 12, crit: 5, eva: 15, acc: 10, agi: 8, expReward: 20 },
  Kaskari: { maxHp: 80, currentHp: 80, maxEn: 20, currentEn: 20, maxMag: 15, currentMag: 15, ar: 2, mres: 4, str: 15, int: 10, crit: 7, eva: 10, acc: 10, agi: 6, expReward: 25 },
  Kryten: { maxHp: 70, currentHp: 70, maxEn: 15, currentEn: 15, maxMag: 10, currentMag: 10, ar: 3, mres: 5, str: 12, int: 10, crit: 5, eva: 8, acc: 8, agi: 5, expReward: 22 },
  ValleyWolf: { maxHp: 90, currentHp: 90, maxEn: 20, currentEn: 20, maxMag: 10, currentMag: 10, ar: 3, mres: 4, str: 20, int: 8, crit: 10, eva: 12, acc: 12, agi: 6, expReward: 30 },
  Grugmir: { maxHp: 100, currentHp: 100, maxEn: 20, currentEn: 20, maxMag: 15, currentMag: 15, ar: 4, mres: 5, str: 20, int: 12, crit: 8, eva: 10, acc: 12, agi: 5, expReward: 35 },
  Molgur: { maxHp: 120, currentHp: 120, maxEn: 25, currentEn: 25, maxMag: 20, currentMag: 20, ar: 5, mres: 7, str: 25, int: 15, crit: 10, eva: 8, acc: 12, agi: 6, expReward: 40 },
  Ayrin: { maxHp: 140, currentHp: 140, maxEn: 30, currentEn: 30, maxMag: 25, currentMag: 25, ar: 4, mres: 8, str: 25, int: 18, crit: 12, eva: 12, acc: 15, agi: 9, expReward: 45 },
  Brontor: { maxHp: 160, currentHp: 160, maxEn: 35, currentEn: 35, maxMag: 15, currentMag: 15, ar: 5, mres: 8, str: 30, int: 12, crit: 10, eva: 8, acc: 8, agi: 5, expReward: 50 },
  CorruptedGolem: { maxHp: 180, currentHp: 180, maxEn: 40, currentEn: 40, maxMag: 15, currentMag: 15, ar: 6, mres: 9, str: 35, int: 15, crit: 8, eva: 6, acc: 8, agi: 4, expReward: 55 },
  Zarnoth: { maxHp: 200, currentHp: 200, maxEn: 25, currentEn: 25, maxMag: 10, currentMag: 10, ar: 8, mres: 10, str: 40, int: 15, crit: 10, eva: 8, acc: 8, agi: 5, expReward: 60 },
  Neridia: { maxHp: 45, currentHp: 45, maxEn: 20, currentEn: 20, maxMag: 50, currentMag: 50, ar: 3, mres: 10, str: 15, int: 15, crit: 8, eva: 8, acc: 10, agi: 6, expReward: 28 },
  Serashka: { maxHp: 95, currentHp: 95, maxEn: 40, currentEn: 40, maxMag: 12, currentMag: 12, ar: 3, mres: 8, str: 22, int: 5, crit: 15, eva: 10, acc: 6, agi: 5, expReward: 30 },
};

// Growth per level Coefficients
export const growthCoefficients = {
  hp: 1.06,
  en: 1.05,
  mag: 1.05,
  ar: 1.05,
  mres: 1.05,
  str: 1.05,
  int: 1.05,
  agi: 1.03,
  acc: 1.03,
  eva: 1.03,
  crit: 1.03,
  exp: 1.1
};

export function calculateStats(base, level, growthCoefficients) {
  if (!base) {
    console.error('Base stats are undefined');
    return {};
  }
  const stats = {
    maxHp: Math.round(base.maxHp * Math.pow(growthCoefficients.hp, level - 1) * (0.9 + Math.random() * 0.2)),
    maxEn: Math.round(base.maxEn * Math.pow(growthCoefficients.en, level - 1) * (0.9 + Math.random() * 0.2)),
    maxMag: Math.round(base.maxMag * Math.pow(growthCoefficients.mag, level - 1) * (0.9 + Math.random() * 0.2)),
    ar: Math.round(base.ar * Math.pow(growthCoefficients.ar, level - 1) * (0.9 + Math.random() * 0.2)),
    mres: Math.round(base.mres * Math.pow(growthCoefficients.mres, level - 1) * (0.9 + Math.random() * 0.2)),
    str: Math.round(base.str * Math.pow(growthCoefficients.str, level - 1) * (0.9 + Math.random() * 0.2)),
    int: Math.round(base.int * Math.pow(growthCoefficients.int, level - 1) * (0.9 + Math.random() * 0.2)),
    crit: Math.round(base.crit * Math.pow(growthCoefficients.crit, level - 1) * (0.9 + Math.random() * 0.2)),
    eva: Math.round(base.eva * Math.pow(growthCoefficients.eva, level - 1) * (0.9 + Math.random() * 0.2)),
    acc: Math.round(base.acc * Math.pow(growthCoefficients.acc, level - 1) * (0.9 + Math.random() * 0.2)),
    agi: Math.round(base.agi * Math.pow(growthCoefficients.agi, level - 1) * (0.9 + Math.random() * 0.2)),
    expReward: Math.round(base.expReward * Math.pow(growthCoefficients.exp, level - 1)),
  };

  return {
    ...stats,
    currentHp: stats.maxHp,
    currentEn: stats.maxEn,
    currentMag: stats.maxMag,
  };
}

// --------------------------------------- GRASSLAND BIOME ----------------------------------------
export const EnemyData = {
  GreenSlime: {
    name: 'Green Slime',
    type: 'Gelatinous',
    level: 1,
    stats: baseStats.GreenSlime,
    image: './images/green-slime.png',
    description: "Small and acidic gelatinous creatures. Not overly aggressive but very sticky and may regenerate over time.", 
    possibleAbilities: ['basicAttack', 'heal'],
  },
  ValleyWolf: {
    name: 'Valley Wolf',
    type: 'Mammal',
    level: 1,
    stats: baseStats.ValleyWolf,
    image: './images/valley-wolf.png',
    description: "A skilled predator and prowler of The Valley.", 
    possibleAbilities: ['basicAttack', 'slash'],
  },
  Velyr: {
    name: 'Velyr',
    type: 'Insect',
    level: 1,
    stats: baseStats.Velyr,
    image: './images/velyr.png',
    description: "Small and docile moth-like beings that float aimlessly on the wind.", 
    possibleAbilities: ['basicAttack'],
  },
  Kaskari: {
    name: 'Kaskari',
    type: 'Mammal',
    level: 1,
    stats: baseStats.Kaskari,
    image: './images/kaskari.png',
    description: "A Small creature with fur resembling the grasses around it and the ability to manipulate plants.", 
    possibleAbilities: ['basicAttack', 'recover'],
  },
  Brontor: {
    name: 'Brontor',
    type: 'Mammal',
    level: 1,
    stats: baseStats.Brontor,
    image: './images/brontor.png',
    description: "A burly beast that attacks by rolling its great weight toward the enemy.", 
    possibleAbilities: ['basicAttack', 'slash'],
  },
  
  // --------------------------------------- MOUNTAIN BIOME ----------------------------------------
  CorruptedGolem: {
    name: 'Corrupted Golem',
    type: 'Construct',
    level: 1,
    stats: baseStats.CorruptedGolem,
    image: './images/corrupted-golem.png',
    description: "An enchanted stone being crafted to guard important things. As millenia pass, their magic drains unevenly from the material, leaving many corrupted by madness.", 
    possibleAbilities: ['basicAttack'],
  },
  Kryten: {
    name: 'Kryten',
    type: 'Construct',
    level: 1,
    stats: baseStats.Kryten,
    image: './images/kryten.png',
    description: "Tiny, crystal-winged creatures with rough, stone-like skin.", 
    possibleAbilities: ['basicAttack'],
  },
  Grugmir: {
    name: 'Grugmir',
    type: 'Construct',
    level: 1,
    stats: baseStats.Grugmir,
    image: './images/grugmir.png',
    description: "Small, sturdy creatures with rocky exteriors and luminous veins.", 
    possibleAbilities: ['basicAttack'],
  },
  Molgur: {
    name: 'Molgur',
    type: 'Reptile',
    level: 1,
    stats: baseStats.Molgur,
    image: './images/molgur.png',
    description: "Reptilian creatures with molten cores and hardened lava scales.", 
    possibleAbilities: ['basicAttack', 'heal'],
  },
  
  // ---------------------------------- TEMPERATE FOREST BIOME -----------------------------------
  /*
  Liyshka
  Thornspir
  Vraloq
  Eldergroth
  */
 // --------------------------------------- SAVANNA BIOME ---------------------------------------
  Ayrin: {
    name: 'Ayrin',
    type: 'Mammal',
    level: 1,
    stats: baseStats.Ayrin,
    image: './images/ayrin.png',
    description: "An antelope-like being said to have the ability to manipulate wind and create powerful gusts.", 
    possibleAbilities: ['basicAttack', 'shunt','burst', 'recover'],
  },
  /*
  Sisharra
  Vaxel
  Miraksha
  Xolara
  */
 // --------------------------------------- WETLANDS BIOME ----------------------------------------
 /*
 Fylsha
 Murklak
 Wraithna
 Bogmor
 */
// --------------------------------------- DESERT BIOME ----------------------------------------
  Zarnoth: {
    name: 'Zarnoth',
    type: 'Construct',
    level: 1,
    stats: baseStats.Zarnoth,
    image: './images/zarnoth.png',
    description: "Massive beings with crystalline spines and immense strength.", 
    possibleAbilities: ['basicAttack', 'slash'],
  },
/*
Kryten
Grugmir
Molgur
Zarnoth
*/
// --------------------------------------- OCEAN BIOME ----------------------------------------
  Neridia: {
    name: 'Neridia',
    type: 'Spirit',
    level: 1,
    stats: baseStats.Neridia,
    image: './images/neridia.png',
    description: "Small ocean spirits. It is believed Neridia will appear floating near the shore where someone recently drowned.", 
    possibleAbilities: ['basicAttack', 'recover'],
  },
  Serashka: {
    name: 'Serashka',
    type: 'Reptile',
    level: 1,
    stats: baseStats.Serashka,
    image: './images/serashka.png',
    description: "Large aquatic serpents with scales that shimmer to match the tides.", 
    possibleAbilities: ['basicAttack', 'slash'],
  },
  BlueSlime: {
    name: 'Blue Slime',
    type: 'Gelatinous',
    level: 1,
    stats: baseStats.GreenSlime,
    image: './images/blue-slime.png',
    description: "Medium sized gelatinous creatures. Very friendly compared to their green counterparts. Very slippery and may regenerate over time.", 
    possibleAbilities: ['basicAttack', 'heal'],
  },
/*
Lumiryn
Lumiryn
Thaloran
*/
// --------------------------------------- TUNDRA BIOME ----------------------------------------
/*
Chryza
Servali
Frinae
Glyshar
*/
// --------------------------------------- TAIGA BIOME ----------------------------------------
/*

*/
// --------------------------------------- CORAL REEF BIOME ----------------------------------------
/*

*/
// ------------------------------------- RAINFOREST BIOME --------------------------------------
/*

*/
// --------------------------------------- ISLAND BIOME ----------------------------------------
/*

*/
};
