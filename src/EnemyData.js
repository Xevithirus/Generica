// Base stats for level 1 enemies
export const baseStats = {
  GreenSlime: { hp: 30, en: 13, mag: 5, str: 3, agi: 5, int: 1 },
  Wolf: { hp: 60, en: 20, mag: 0, str: 22, agi: 8, int: 8 },
  Velyra: { hp: 25, en: 15, mag: 5, str: 6, agi: 10, int: 3 },
  Kaskari: { hp: 45, en: 15, mag: 10, str: 10, agi: 10, int: 5 },
  CorruptedGolem: { hp: 300, en: 30, mag: 25, str: 50, agi: 10, int: 15 }
};

// Function to calculate stats based on level
export function calculateStats(base, level) {
  return {
    hp: Math.round(base.hp * Math.pow(level, 1.2) * (0.9 + Math.random() * 0.2)),
    en: Math.round(base.en * Math.pow(level, 1.1) * (0.9 + Math.random() * 0.2)),
    mag: Math.round(base.mag * Math.pow(level, 1.1) * (0.9 + Math.random() * 0.2)),
    str: Math.round(base.str * Math.pow(level, 1.1) * (0.9 + Math.random() * 0.2)),
    agi: Math.round(base.agi * Math.pow(level, 1.05) * (0.9 + Math.random() * 0.2)),
    int: Math.round(base.int * Math.pow(level, 1.05) * (0.9 + Math.random() * 0.2)),
  };
}

// Updated enemy data with random level
export const EnemyData = {
  GreenSlime: {
    name: 'Green Slime',
    type: 'Gelatinous',
    level: 1,
    baseStats: baseStats.GreenSlime,
    image: './images/green-slime.png'
  },
  Wolf: {
    name: 'Valley Wolf',
    type: 'Canine',
    level: 2,
    baseStats: baseStats.Wolf,
    image: './images/valley-wolf.png'
  },
  Velyra: {
    name: 'Velyra',
    type: 'Insect',
    level: 1,
    baseStats: baseStats.Velyra,
    image: './images/velyra.png'
  },
  Kaskari: {
    name: 'Kaskari',
    type: 'Ruminant',
    level: 1,
    baseStats: baseStats.Kaskari,
    image: './images/kaskari.png'
  },
  CorruptedGolem: {
    name: 'Corrupted Golem',
    type: 'Enchantment',
    level: 3,
    baseStats: baseStats.CorruptedGolem,
    image: './images/corrupted-golem.png'
  }
};
