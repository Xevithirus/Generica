// EffectData.js
export const EffectData = {
  stun: {
    apply: (target, duration, chance) => {
      if (Math.random() < chance) {
        target.statusEffects = {
          ...target.statusEffects,
          stun: {
            turnsRemaining: duration,
          },
        };
        return true; // Stun was successful
      }
      return false; // Stun failed
    },
    tick: (target) => {
      if (target.statusEffects?.stun) {
        if (target.statusEffects.stun.turnsRemaining > 0) {
          target.statusEffects.stun.turnsRemaining -= 1;
        } else {
          delete target.statusEffects.stun;
        }
      }
    },
    isStunned: (target) => {
      return target.statusEffects?.stun?.turnsRemaining > 0;
    },
  },
};

