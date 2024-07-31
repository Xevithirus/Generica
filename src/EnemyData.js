// Base stats for level 1 enemies
export const baseStats = {
  GreenSlime: { hp: 50, en: 10, mag: 10, ap: 15, ar: 5, mres: 5, crit: 5, eva: 10, agi: 10, acc: 10 },
  ValleyWolf: { hp: 90, en: 15, mag: 5, ap: 20, ar: 10, mres: 5, crit: 10, eva: 15, agi: 20, acc: 20 },
  Velyr: { hp: 60, en: 15, mag: 15, ap: 10, ar: 5, mres: 10, crit: 5, eva: 20, agi: 20, acc: 15 },
  Kaskari: { hp: 100, en: 20, mag: 10, ap: 25, ar: 15, mres: 15, crit: 10, eva: 15, agi: 20, acc: 20 },
  Ayrin: { hp: 140, en: 20, mag: 20, ap: 35, ar: 20, mres: 15, crit: 15, eva: 15, agi: 15, acc: 25 },
  Brontor: { hp: 180, en: 30, mag: 25, ap: 50, ar: 25, mres: 20, crit: 20, eva: 10, agi: 10, acc: 15 },
  CorruptedGolem: { hp: 220, en: 35, mag: 15, ap: 60, ar: 30, mres: 25, crit: 15, eva: 5, agi: 5, acc: 10 },
  Kryten: { hp: 70, en: 10, mag: 10, ap: 15, ar: 10, mres: 10, crit: 5, eva: 10, agi: 10, acc: 15 },
  Grugmir: { hp: 110, en: 20, mag: 15, ap: 25, ar: 20, mres: 15, crit: 10, eva: 10, agi: 10, acc: 20 },
  Molgur: { hp: 160, en: 25, mag: 20, ap: 40, ar: 25, mres: 20, crit: 15, eva: 10, agi: 10, acc: 25 },
  Zarnoth: { hp: 230, en: 30, mag: 15, ap: 60, ar: 30, mres: 25, crit: 10, eva: 5, agi: 5, acc: 10 }
};

// Growth per level Coefficients
export const growthCoefficients = {
  hp: 1.06,   
  mag: 1.05,  
  ap: 1.05,   
  ar: 1.05,   
  mres: 1.05, 
  agi: 1.03,  
  acc: 1.03,  
  eva: 1.03, 
  crit: 1.03, 
  en: 1.05, 
};

export function calculateStats(base, level, growthCoefficients) {

  if (!base) {
    console.error('Base stats are undefined');
    return {};
  }
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
    description: "An enchanted stone being crafted to guard important things. As millenias pass, their magic drains unevenly from the material, leaving many corrupted by madness.", 
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
    description: "Antelope-like beings with the ability to manipulate wind and create powerful gusts.", 
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
