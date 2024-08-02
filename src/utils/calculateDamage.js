export const calculateDamage = (attacker, defender, abilityDetails) => {
  const criticalMultiplier = 1.5;
  const randomFactor = 0.1; // 10% random modifier for variability
  const baseHitChance = 0.75; // 75% base hit chance
  const minHitChance = 0.1; // Minimum 10% hit chance
  const maxHitChance = 0.95; // Maximum 95% hit chance

  let baseDamage = 0;
  let finalDamage = 0;

  let damageType = '';
  let mitigatedAmount = 0;
  let isCritical = false;
  let didHit = true;

  // Calculate base damage based on ability effect
  const abilityEffect = abilityDetails.effect(attacker);
  const damage = abilityEffect.damage !== undefined && abilityEffect.damage !== null ? abilityEffect.damage : 0; // Ensure damage is not null or undefined

  console.log(`Ability Effect: ${JSON.stringify(abilityEffect)}`); // Log ability effect

  // Apply random factor to the base damage
  if (abilityEffect.type === 'physical') {
    damageType = 'physical';
    baseDamage = damage * (1 + (Math.random() - 0.5) * 2 * randomFactor);
    mitigatedAmount = defender.stats.ar;
    finalDamage = baseDamage - mitigatedAmount;
  } else if (abilityEffect.type === 'magical') {
    damageType = 'magical';
    baseDamage = damage * (1 + (Math.random() - 0.5) * 2 * randomFactor);
    mitigatedAmount = defender.stats.mres;
    finalDamage = baseDamage - mitigatedAmount;
  }

  console.log(`Base Damage: ${baseDamage}, Mitigated Amount: ${mitigatedAmount}, Final Damage: ${finalDamage}`); // Log damage details

  // Ensure final damage is at least 1
  finalDamage = Math.max(1, finalDamage);

  // Critical strike chance
  isCritical = Math.random() < (attacker.stats.crit / 100);
  if (isCritical) {
    finalDamage *= criticalMultiplier;
  }

  // Apply agility-based hit chance
  let hitChance = baseHitChance + (attacker.stats.agi - defender.stats.agi) / 100;
  hitChance = Math.max(minHitChance, Math.min(maxHitChance, hitChance));
  didHit = Math.random() < hitChance;
  if (!didHit) {
    finalDamage = 0; // Missed attack
  }

  console.log(`Hit Chance: ${hitChance}, Did Hit: ${didHit}, Is Critical: ${isCritical}`); // Log hit details

  return {
    finalDamage: Math.round(finalDamage),
    baseDamage: Math.round(baseDamage), 
    damageType,
    mitigatedAmount: Math.round(mitigatedAmount),
    isCritical,
    didHit,
  };
};
