// calculateHealing.js
export const calculateHealing = (healer, abilityDetails) => {
  const abilityEffect = abilityDetails.effect(healer);
  let healingAmount = 0;

  if (abilityEffect.type === 'heal') {
    healingAmount = abilityEffect.heal;
  }

  console.log(`Healing Amount: ${healingAmount}`); // Log healing amount

  return {
    healingAmount: Math.round(healingAmount),
    effectType: 'heal',
  };
};
