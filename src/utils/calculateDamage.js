// calculateDamage.js
export const calculateDamage = (attacker, defender, attackType) => {
  const criticalMultiplier = 1.5; // Critical hits deal 150% damage
  let baseDamage = 0;
  let finalDamage = 0;

  // Separate multipliers and bonuses for clarity
  const equipmentBonus = attacker.stats.equipmentBonuses || 0;
  const buffMultiplier = attacker.stats.buffMultipliers || 0;
  const itemEffectMultiplier = attacker.stats.itemEffectMultipliers || 0;

  const enemyEquipmentBonus = defender.stats.equipmentBonuses || 0;
  const enemyBuffMultiplier = defender.stats.buffMultipliers || 0;
  const enemyItemEffectMultiplier = defender.stats.itemEffectMultipliers || 0;

  const totalAttackMultiplier = 1 + equipmentBonus + buffMultiplier + itemEffectMultiplier;
  const totalDefenseMultiplier = 1 + enemyEquipmentBonus + enemyBuffMultiplier + enemyItemEffectMultiplier;

  let damageType = '';
  let mitigatedAmount = 0;
  let isCritical = false;
  let didHit = false;

  // Calculate base damage based on attack type
  if (attackType === 'physical') {
    damageType = 'physical';
    baseDamage = attacker.stats.str * attacker.stats.weaponMultiplier * totalAttackMultiplier;
    mitigatedAmount = defender.stats.ar * totalDefenseMultiplier;
    finalDamage = baseDamage - mitigatedAmount;
  } else if (attackType === 'magical') {
    damageType = 'magical';
    baseDamage = attacker.stats.int * attacker.stats.magicMultiplier * totalAttackMultiplier;
    mitigatedAmount = defender.stats.mres * totalDefenseMultiplier;
    finalDamage = baseDamage - mitigatedAmount;
  } else if (attackType === 'mixed') {
    damageType = 'mixed';
    const physicalDamage = attacker.stats.str * attacker.stats.weaponMultiplier * totalAttackMultiplier;
    const magicDamage = attacker.stats.int * attacker.stats.magicMultiplier * totalAttackMultiplier;
    const physicalMitigated = defender.stats.ar * totalDefenseMultiplier;
    const magicMitigated = defender.stats.mres * totalDefenseMultiplier;
    finalDamage = Math.max(0, physicalDamage - physicalMitigated) + Math.max(0, magicDamage - magicMitigated);
    mitigatedAmount = physicalMitigated + magicMitigated;
  }

  // Ensure final damage is at least 1 if it hits
  finalDamage = Math.max(1, finalDamage);

  // Critical strike chance
  isCritical = Math.random() < (attacker.stats.crit / 100);
  if (isCritical) {
    finalDamage *= criticalMultiplier;
  }

  // Apply accuracy and evasion
  const hitChance = attacker.stats.acc / (attacker.stats.acc + defender.stats.eva);
  didHit = Math.random() < hitChance;

  if (!didHit) {
    finalDamage = 0; // Missed attack
  }

  return {
    finalDamage: Math.round(finalDamage),
    damageType,
    mitigatedAmount: Math.round(mitigatedAmount),
    isCritical,
    didHit
  };
};
