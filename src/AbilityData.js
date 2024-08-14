export const AbilityData = {
  basicAttack: {
    name: 'Basic Attack',
    requiredLevel: 1,
    cost: { energy: 0, magic: 0 },
    castTime: 1, // Quick and frequent use
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
    castTime: 2, // Slightly longer due to its magical nature
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
    castTime: 2, // Moderate speed for a minor heal
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
    castTime: 2, // Consistent with other minor healing abilities
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
    castTime: 4, // High impact, thus higher cast time
    description: "Gather magic and release it in a burst, dealing reasonable damage.",
    damage: (user) => ({
      type: 'magical',
      damage: user.stats.int * 1.5, // Deal 150% of the user's intellect as damage
    }),
  },
  slash: {
    name: 'Slash',
    requiredLevel: 2,
    cost: { energy: 5, magic: 0 },
    castTime: 3, // Powerful physical attack, moderate cast time
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
    castTime: 3, // Significant healing, moderate cast time
    description: "A healing ability that restores a reasonable amount of health.",
    healing: (user) => ({
      type: 'heal',
      heal: user.stats.int + (user.stats.maxHp * 0.3), // Heal int + 30% of max HP
    }),
  },
  shieldBash: {
    name: 'shieldBash',
    requiredLevel: 3,
    cost: { energy: 10, magic: 0 },
    castTime: 1, // Quick and impactful with a chance to stun
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
    castTime: 1, // Quick but with a minor effect
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
