// Base stats for level 1 enemies
export const baseStats = {
  GreenSlime: { hp: 30, en: 10, mag: 5, ar: 2, mres: 3, str: 10, int: 5, crit: 3, eva: 5, acc: 5, agi: 4 },
  Velyr: { hp: 40, en: 10, mag: 10, ar: 3, mres: 5, str: 5, int: 8, crit: 5, eva: 15, acc: 8, agi: 10 },
  Kaskari: { hp: 60, en: 20, mag: 15, ar: 5, mres: 8, str: 12, int: 10, crit: 7, eva: 12, acc: 10, agi: 10 },
  Kryten: { hp: 50, en: 10, mag: 8, ar: 4, mres: 6, str: 10, int: 8, crit: 5, eva: 7, acc: 8, agi: 6 },
  ValleyWolf: { hp: 70, en: 15, mag: 5, ar: 5, mres: 4, str: 15, int: 5, crit: 8, eva: 10, acc: 10, agi: 12 },
  Grugmir: { hp: 80, en: 15, mag: 10, ar: 6, mres: 8, str: 15, int: 10, crit: 6, eva: 8, acc: 10, agi: 8 },
  Molgur: { hp: 100, en: 20, mag: 15, ar: 10, mres: 10, str: 20, int: 12, crit: 8, eva: 6, acc: 12, agi: 8 },
  Ayrin: { hp: 110, en: 25, mag: 20, ar: 8, mres: 10, str: 20, int: 15, crit: 10, eva: 12, acc: 15, agi: 15 },
  Brontor: { hp: 130, en: 30, mag: 10, ar: 12, mres: 10, str: 25, int: 10, crit: 8, eva: 6, acc: 8, agi: 6 },
  CorruptedGolem: { hp: 150, en: 35, mag: 10, ar: 15, mres: 12, str: 30, int: 10, crit: 7, eva: 4, acc: 6, agi: 4 },
  Zarnoth: { hp: 200, en: 25, mag: 10, ar: 20, mres: 15, str: 40, int: 10, crit: 10, eva: 5, acc: 6, agi: 5 }
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
    hp: Math.round(base.hp * Math.pow(growthCoefficients.hp, level - 1) * (0.9 + Math.random() * 0.2)),
    en: Math.round(base.en * Math.pow(growthCoefficients.en, level - 1) * (0.9 + Math.random() * 0.2)),
    mag: Math.round(base.mag * Math.pow(growthCoefficients.mag, level - 1) * (0.9 + Math.random() * 0.2)),
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
  },
  ValleyWolf: {
    name: 'Valley Wolf',
    type: 'Mammal',
    level: 1,
    stats: baseStats.ValleyWolf,
    image: './images/valley-wolf.png',
    description: "A skilled predator and prowler of The Valley.", 
  },
  Velyr: {
    name: 'Velyr',
    type: 'Insect',
    level: 1,
    stats: baseStats.Velyr,
    image: './images/velyr.png',
    description: "Small and docile moth-like beings that float aimlessly on the wind.", 
  },
  Kaskari: {
    name: 'Kaskari',
    type: 'Mammal',
    level: 1,
    stats: baseStats.Kaskari,
    image: './images/kaskari.png',
    description: "A Small creature with fur resembling the grasses around it and the ability to manipulate plants.", 
  },
  Brontor: {
    name: 'Brontor',
    type: 'Mammal',
    level: 1,
    stats: baseStats.Brontor,
    image: './images/brontor.png',
    description: "A burly beast that attacks by rolling its great weight toward the enemy.", 
  },
  
  // --------------------------------------- MOUNTAIN BIOME ----------------------------------------
  CorruptedGolem: {
    name: 'Corrupted Golem',
    type: 'Construct',
    level: 1,
    stats: baseStats.CorruptedGolem,
    image: './images/corrupted-golem.png',
    description: "An enchanted stone being crafted to guard important things. As millenia pass, their magic drains unevenly from the material, leaving many corrupted by madness.", 
  },
  Kryten: {
    name: 'Kryten',
    type: 'Construct',
    level: 1,
    stats: baseStats.Kryten,
    image: './images/kryten.png',
    description: "Tiny, crystal-winged creatures with rough, stone-like skin.", 
  },
  Grugmir: {
    name: 'Grugmir',
    type: 'Construct',
    level: 1,
    stats: baseStats.Grugmir,
    image: './images/grugmir.png',
    description: "Small, sturdy creatures with rocky exteriors and luminous veins.", 
  },
  Molgur: {
    name: 'Molgur',
    type: 'Reptile',
    level: 1,
    stats: baseStats.Molgur,
    image: './images/molgur.png',
    description: "Reptilian creatures with molten cores and hardened lava scales.", 
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
