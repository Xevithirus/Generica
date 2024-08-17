export const AbilityData = {
  basicAttack: {
    name: 'Basic Attack',
    requiredLevel: 1,
    cost: { energy: 0, magic: 0 },
    castTime: 8, // Quick ability, resolves in 1 turn for average agility
    description: "A basic attack using whatever you have in-hand.",
    damage: (user) => ({
      type: 'physical',
      damage: user.stats.str * (user.stats.weaponMultiplier || 1),
    }),
  },
  shunt: {
    name: 'Shunt',
    requiredLevel: 1,
    cost: { energy: 0, magic: 5 },
    castTime: 10, // Quick ability, resolves in 1 turn for average agility
    description: "The most basic spell. Push unfocused energy forwards dealing minor damage.",
    damage: (user) => ({
      type: 'magical',
      damage: user.stats.int * (user.stats.magicMultiplier || 1),
    }),
  },
  bandage: {
    name: 'Bandage',
    requiredLevel: 1,
    cost: { energy: 5, magic: 0 },
    castTime: 20, // Medium ability, resolves in 2 turns for average agility
    description: "Use torn cloth to stop bleeding and recover a small amount of damage.",
    healing: (user) => ({
      type: 'heal',
      heal: 10 + user.stats.maxHp * 0.15, // Heal 10 + 15% of max HP
    }),
  },
  recover: {
    name: 'Recover',
    requiredLevel: 1,
    cost: { energy: 0, magic: 5 },
    castTime: 20, // Medium ability, resolves in 2 turns for average agility
    description: "Use magic to stop bleeding and recover a small amount of health.",
    healing: (user) => ({
      type: 'heal',
      heal: user.stats.int + (user.stats.maxHp * 0.1), // Heal int + 10% of max HP
    }),
  },
  burst: {
    name: 'Burst',
    requiredLevel: 2,
    cost: { energy: 0, magic: 10 },
    castTime: 30, // Slow ability, resolves in 3 turns for average agility
    description: "Gather magic and release it in a burst, dealing reasonable damage.",
    damage: (user) => ({
      type: 'magical',
      damage: user.stats.int * 1.5, // Deal 150% of the user's intellect as damage
    }),
  },
  heavyBlow: {
    name: 'Heavy Blow',
    requiredLevel: 2,
    cost: { energy: 5, magic: 0 },
    castTime: 30, // Slow ability, resolves in 3 turns for average agility
    description: "A focused physical attack that deals reasonable damage.",
    damage: (user) => ({
      type: 'physical',
      damage: user.stats.str * 1.5, // Deal 150% of the user's strength as damage
    }),
  },
  heal: {
    name: 'Heal',
    requiredLevel: 3,
    cost: { energy: 0, magic: 10 },
    castTime: 20, // Medium ability, resolves in 2 turns for average agility
    description: "A healing ability that restores a reasonable amount of health.",
    healing: (user) => ({
      type: 'heal',
      heal: user.stats.int + (user.stats.maxHp * 0.3), // Heal int + 30% of max HP
    }),
  },
  shieldBash: {
    name: 'Shield Bash',
    requiredLevel: 3,
    cost: { energy: 10, magic: 0 },
    castTime: 8, // Quick ability, resolves in 1 turn for average agility
    description: "Slam your shield into the enemy. Deals damage and has a chance to stun.",
    damage: (user) => ({
      type: 'physical',
      damage: user.stats.str * 0.20,
    }),
    effect: (user, target) => ({
      stun: {
        chance: 0.75,
        duration: 2,
      },
    }),
  },
  concuss: {
    name: 'Concuss',
    requiredLevel: 3,
    cost: { energy: 0, magic: 10 },
    castTime: 8, // Quick ability, resolves in 1 turn for average agility
    description: "Shocks the enemy with a wave of energy. Deals minor damage and has a chance to stun the enemy for a long duration.",
    damage: (user) => ({
      type: 'magical',
      damage: user.stats.int * 0.15,
    }),
    effect: (user, target) => ({
      stun: {
        chance: 0.75,
        duration: 3,
      },
    }),
  },
};
