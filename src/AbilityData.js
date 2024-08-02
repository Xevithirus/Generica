export const AbilityData = {
  basicAttack: {
    name: 'Basic Attack',
    requiredLevel: 1,
    cost: { energy: 0, magic: 0 },
    effect: (user) => ({
      type: 'physical',
      damage: user.stats.str * (user.stats.weaponMultiplier || 1), // Default to 1 if undefined
    }),
  },
  shunt: {
    name: 'Shunt',
    requiredLevel: 1,
    cost: { energy: 0, magic: 5 },
    effect: (user) => ({
      type: 'magical',
      damage: user.stats.int * (user.stats.magicMultiplier || 1) // Default to 1 if undefined
    }),
  },
  recover: {
    name: 'Recover',
    requiredLevel: 1,
    cost: { energy: 5, magic: 0 },
    effect: (user) => ({
      type: 'heal',
      heal: user.stats.maxHp * 0.1, // Heal 10% of max HP
    }),
  },
  knockBack: {
    name: 'Knock Back',
    requiredLevel: 2,
    cost: { energy: 10, magic: 0 },
    effect: (user) => ({
      type: 'physical',
      damage: user.stats.str * (user.stats.weaponMultiplier || 1),
      additionalEffect: { type: 'stun', chance: 0.7 },
    }),
  },
  shoot: {
    name: 'Shoot',
    requiredLevel: 1,
    cost: { energy: 0, magic: 0, arrows: 1 },
    effect: (user) => ({ type: 'physical', damage: user.stats.weaponDamage || 0 }),
  },
};

