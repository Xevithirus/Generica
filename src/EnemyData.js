// EnemyData.js
const assignAbilities = (enemy, level) => {
  const availableAbilities = enemy.possibleAbilities.filter(ability => AbilityData[ability].requiredLevel <= level);
  return availableAbilities;
};

// Base stats for level 1 enemies
export const baseStats = {
  GreenSlime: { maxHp: 60, currentHp: 60, maxEn: 20, currentEn: 20, maxMag: 10, currentMag: 10, ar: 4, mres: 2, str: 15, int: 10, crit: 5, eva: 5, acc: 8, agi: 8 },
  Velyr: { maxHp: 80, currentHp: 80, maxEn: 20, currentEn: 20, maxMag: 20, currentMag: 20, ar: 0, mres: 5, str: 10, int: 15, crit: 8, eva: 20, acc: 12, agi: 15 },
  Kaskari: { maxHp: 120, currentHp: 120, maxEn: 30, currentEn: 30, maxMag: 25, currentMag: 25, ar: 2, mres: 6, str: 20, int: 15, crit: 10, eva: 15, acc: 12, agi: 15 },
  Kryten: { maxHp: 100, currentHp: 100, maxEn: 20, currentEn: 20, maxMag: 15, currentMag: 15, ar: 4, mres: 5, str: 15, int: 12, crit: 8, eva: 10, acc: 10, agi: 10 },
  ValleyWolf: { maxHp: 140, currentHp: 140, maxEn: 25, currentEn: 25, maxMag: 10, currentMag: 10, ar: 5, mres: 4, str: 25, int: 8, crit: 12, eva: 15, acc: 15, agi: 18 },
  Grugmir: { maxHp: 160, currentHp: 160, maxEn: 25, currentEn: 25, maxMag: 20, currentMag: 20, ar: 6, mres: 6, str: 25, int: 15, crit: 10, eva: 10, acc: 15, agi: 12 },
  Molgur: { maxHp: 200, currentHp: 200, maxEn: 30, currentEn: 30, maxMag: 25, currentMag: 25, ar: 9, mres: 7, str: 30, int: 18, crit: 12, eva: 10, acc: 15, agi: 12 },
  Ayrin: { maxHp: 220, currentHp: 220, maxEn: 35, currentEn: 35, maxMag: 30, currentMag: 30, ar: 7, mres: 9, str: 30, int: 20, crit: 15, eva: 15, acc: 18, agi: 18 },
  Brontor: { maxHp: 260, currentHp: 260, maxEn: 40, currentEn: 40, maxMag: 15, currentMag: 15, ar: 10, mres: 9, str: 35, int: 15, crit: 12, eva: 10, acc: 10, agi: 10 },
  CorruptedGolem: { maxHp: 300, currentHp: 300, maxEn: 45, currentEn: 45, maxMag: 15, currentMag: 15, ar: 12, mres: 10, str: 40, int: 15, crit: 10, eva: 8, acc: 10, agi: 8 },
  Zarnoth: { maxHp: 400, currentHp: 400, maxEn: 30, currentEn: 30, maxMag: 15, currentMag: 15, ar: 15, mres: 12, str: 50, int: 15, crit: 15, eva: 10, acc: 10, agi: 10 },
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
};

export function calculateStats(base, level, growthCoefficients) {
  if (!base) {
    console.error('Base stats are undefined');
    return {};
  }
  return {
    maxHp: Math.round(base.maxHp * Math.pow(growthCoefficients.hp, level - 1) * (0.9 + Math.random() * 0.2)),
    currentHp: Math.round(base.maxHp * Math.pow(growthCoefficients.hp, level - 1) * (0.9 + Math.random() * 0.2)),
    maxEn: Math.round(base.maxEn * Math.pow(growthCoefficients.en, level - 1) * (0.9 + Math.random() * 0.2)),
    currentEn: Math.round(base.maxEn * Math.pow(growthCoefficients.en, level - 1) * (0.9 + Math.random() * 0.2)),
    maxMag: Math.round(base.maxMag * Math.pow(growthCoefficients.mag, level - 1) * (0.9 + Math.random() * 0.2)),
    currentMag: Math.round(base.maxMag * Math.pow(growthCoefficients.mag, level - 1) * (0.9 + Math.random() * 0.2)),
    ar: Math.round(base.ar * Math.pow(growthCoefficients.ar, level - 1) * (0.9 + Math.random() * 0.2)),
    mres: Math.round(base.mres * Math.pow(growthCoefficients.mres, level - 1) * (0.9 + Math.random() * 0.2)),
    str: Math.round(base.str * Math.pow(growthCoefficients.str, level - 1) * (0.9 + Math.random() * 0.2)),
    int: Math.round(base.int * Math.pow(growthCoefficients.int, level - 1) * (0.9 + Math.random() * 0.2)),
    crit: Math.round(base.crit * Math.pow(growthCoefficients.crit, level - 1) * (0.9 + Math.random() * 0.2)),
    eva: Math.round(base.eva * Math.pow(growthCoefficients.eva, level - 1) * (0.9 + Math.random() * 0.2)),
    acc: Math.round(base.acc * Math.pow(growthCoefficients.acc, level - 1) * (0.9 + Math.random() * 0.2)),
    agi: Math.round(base.agi * Math.pow(growthCoefficients.agi, level - 1) * (0.9 + Math.random() * 0.2)),
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
    description: "Small and acidic gelatinous creatures. Not overly aggressive but very sticky.", 
    possibleAbilities: ['basicAttack', 'recover'],
  },
  ValleyWolf: {
    name: 'Valley Wolf',
    type: 'Mammal',
    level: 1,
    stats: baseStats.ValleyWolf,
    image: './images/valley-wolf.png',
    description: "A skilled predator and prowler of The Valley.", 
    possibleAbilities: ['basicAttack'],
  },
  Velyr: {
    name: 'Velyr',
    type: 'Insect',
    level: 1,
    stats: baseStats.Velyr,
    image: './images/velyr.png',
    description: "Small and docile moth-like beings that float aimlessly on the wind.", 
    possibleAbilities: ['basicAttack', 'shunt'],
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
    possibleAbilities: ['basicAttack'],
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
    possibleAbilities: ['basicAttack'],
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
    possibleAbilities: ['basicAttack', 'shunt', 'recover'],
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
    possibleAbilities: ['basicAttack'],
  },
/*
Kryten
Grugmir
Molgur
Zarnoth
*/
// --------------------------------------- OCEAN BIOME ----------------------------------------
/*
Neridia
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
