export const AbilityData = {
  basicAttack: {
    name: 'Basic Attack',
    requiredLevel: 1,
    cost: { energy: 0, magic: 0 },
    castTime: 1,
    description: "A basic attack using whatever you have in-hand.",
    damage: (user) => ({
      type: 'physical',
      damage: user.stats.str * (user.stats.weaponMultiplier || 1), // Default to 1 if undefined
    }),
  },
  shunt: {
    name: 'Shunt',
    requiredLevel: 1,
    cost: { energy: 0, magic: 5 },
    castTime: 2,
    description: "The most basic spell. Push unfocused energy forwards dealing minor damage.",
    damage: (user) => ({
      type: 'magical',
      damage: user.stats.int * (user.stats.magicMultiplier || 1) // Default to 1 if undefined
    }),
  },
  bandage: {
    name: 'Bandage',
    requiredLevel: 1,
    cost: { energy: 5, magic: 0 },
    castTime: 2,
    description: "Use torn cloth to stop bleeding and recover a small amount of damage.",
    healing: (user) => ({
      type: 'heal',
      heal: user.stats.maxHp * 0.1, // Heal 10% of max HP
    }),
  },
  recover: {
    name: 'Recover',
    requiredLevel: 1,
    cost: { energy: 0, magic: 5 },
    castTime: 2,
    description: "Use magic to stop bleeding and recover a small amount of health.",
    healing: (user) => ({
      type: 'heal',
      heal: user.stats.maxHp * 0.1, // Heal 10% of max HP
    }),
  },
  burst: {
    name: 'Burst',
    requiredLevel: 2,
    cost: { energy: 0, magic: 10 },
    castTime: 4,
    description: "Gather magic and release it in a burst, dealing reasonable damage.",
    damage: (user) => ({
      type: 'magical',
      damage: user.stats.int * 1.5 // Deal 150% of the user's intellect as damage
    }),
  },
  slash: {
    name: 'Slash',
    requiredLevel: 2,
    cost: { energy: 5, magic: 0 },
    castTime: 3,
    description: "A focused physical attack that deals reasonable damage.",
    damage: (user) => ({
      type: 'physical',
      damage: user.stats.str * 1.5 // Deal 150% of the user's strength as damage
    }),
  },
  heal: {
    name: 'Heal',
    requiredLevel: 2,
    cost: { energy: 0, magic: 10 },
    castTime: 3,
    description: "A healing ability that restores a reasonable amount of health.",
    healing: (user) => ({
      type: 'heal',
      heal: user.stats.maxHp * 0.3 // Heal 30% of max HP
    }),
  },
  shieldBash: {
    name: 'shieldBash',
    requiredLevel: 1,
    cost: { energy: 20, magic: 0 },
    castTime: 1,
    description: "Slam your shield into the enemy. Deals damage and has a chance to stun.",
    damage: (user) => ({
      type: 'physical',
      damage: user.stats.str * 0.30,
    }),
    effect: (user, target) => ({
      stun: {
        chance: 0.75,
        duration: 2,
      },
    }),
  },
};
