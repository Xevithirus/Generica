// calculateHealing.js
export const calculateHealing = (healer, abilityDetails) => {
  let healingAmount = 0;

  // Check if the healing function exists
  if (abilityDetails.healing) {
    const abilityEffect = abilityDetails.healing(healer);
    if (abilityEffect.type === 'heal') {
      healingAmount = abilityEffect.heal;
    }
  }

  return {
    healingAmount: Math.round(healingAmount),
    effectType: 'heal',
  };
};
