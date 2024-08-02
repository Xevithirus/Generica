// CombatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useCharacter } from './CharacterContext';
import { calculateDamage } from './utils/calculateDamage';
import { calculateHealing } from './utils/calculateHealing';
import { getProfileImageSrc } from './utils/utils';
import Popup from './common/Popup';
import { AbilityData } from './AbilityData';

export default function CombatWindow({ enemy, setInCombat, setEnemy, setCurrentRegion, setCurrentArea, setCurrentLocalPosition, setCurrentActivity }) {
  const { character, setCharacter, lastInn } = useCharacter();
  const [combatLog, setCombatLog] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showAbilityMenu, setShowAbilityMenu] = useState(false);
  const combatLogRef = useRef(null);

  if (!enemy) {
    return <p>No enemy data to display</p>;
  }

  useEffect(() => {
    if (combatLogRef.current) {
      combatLogRef.current.scrollTop = combatLogRef.current.scrollHeight;
    }
  }, [combatLog]);

  const handleAbilityUse = (ability) => {
    if (!enemy) return;

    const abilityDetails = AbilityData[ability];
    console.log('Ability Details:', abilityDetails);

    if (character.currentEn < abilityDetails.cost.energy || character.currentMag < abilityDetails.cost.magic) {
      setCombatLog(prevLog => [...prevLog, <div key={prevLog.length}>You do not have enough resources to use {abilityDetails.name}!</div>]);
      return;
    }

    let result;
    if (abilityDetails.effect(character).type === 'heal') {
      result = calculateHealing(character, abilityDetails);
      setCharacter(prev => ({
        ...prev,
        currentHp: Math.min(prev.stats.maxHp, prev.currentHp + result.healingAmount),
        currentEn: prev.currentEn - abilityDetails.cost.energy,
        currentMag: prev.currentMag - abilityDetails.cost.magic,
      }));
      setCombatLog(prevLog => [
        ...prevLog,
        generateLogMessage('You', null, result, false)
      ]);
    } else {
      result = calculateDamage(character, enemy, abilityDetails);
      const updatedEnemy = {
        ...enemy,
        stats: {
          ...enemy.stats,
          currentHp: Math.max(0, enemy.stats.currentHp - result.finalDamage),
        },
      };

      setEnemy(updatedEnemy);

      const enemyAttack = calculateDamage(enemy, character, AbilityData['basicAttack']);
      
      setCharacter(prev => ({
        ...prev,
        currentHp: Math.max(0, prev.currentHp - enemyAttack.finalDamage),
      }));

      setCombatLog(prevLog => [
        ...prevLog,
        generateLogMessage('You', enemy.name, result, false),
        generateLogMessage(enemy.name, 'you', enemyAttack, true),
      ]);
    }

    console.log('Result:', result);

    if (enemy.stats.currentHp <= 0) {
      setPopupMessage(`You have defeated the ${enemy.name}!`);
      setShowPopup(true);
    } else if (character.currentHp <= 0) {
      setPopupMessage('You have been defeated...');
      setShowPopup(true);
    }
  };

const generateLogMessage = (attackerName, defenderName, attackDetails, isEnemyAttacking) => {
  if (attackDetails.effectType === 'heal') {
    const healAmount = <span style={{ color: '#00eeff' }}>{attackDetails.healingAmount}</span>;
    if (isEnemyAttacking) {
      return <div key={combatLog.length}>The {attackerName} heals for {healAmount} health!</div>;
    } else {
      return <div key={combatLog.length}>You heal for {healAmount} health!</div>;
    }
  } else if (!attackDetails.didHit) {
    return <div key={combatLog.length}>{attackerName} missed!</div>;
  } else {
    const damageColor = isEnemyAttacking ? 'red' : '#00ff00';
    const baseDamage = <span>{attackDetails.baseDamage}</span>;
    const mitigatedAmount = <span>{attackDetails.mitigatedAmount}</span>;
    const finalDamage = <span style={{ color: damageColor }}>{attackDetails.finalDamage}</span>;

    let message;
    if (isEnemyAttacking) {
      message = (
        <div key={combatLog.length}>
          <p>The {attackerName} attacks you for {baseDamage} {attackDetails.damageType} damage! {mitigatedAmount} damage was mitigated.</p>
          <p>You take {finalDamage} damage!</p>
          {attackDetails.isCritical && <p><span style={{ color: 'yellow' }}>Critical Strike!</span></p>}
        </div>
      );
    } else {
      message = (
        <div key={combatLog.length}>
          <p>You attack the {defenderName} for {baseDamage} {attackDetails.damageType} damage! {mitigatedAmount} damage was mitigated.</p>
          <p>The {defenderName} takes {finalDamage} damage!</p>
          {attackDetails.isCritical && <p><span style={{ color: 'yellow' }}>Critical Strike!</span></p>}
        </div>
      );
    }
    return message;
  }
};

  const handleAttackClick = () => {
    setShowAbilityMenu(true);
  };

  const handleUseClick = () => {
    console.log("Opened Use Menu...");
  };

  const handleFleeClick = () => {
    console.log("Attempting to flee...");
    setEnemy(null);
    setInCombat(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (popupMessage === 'You have been defeated...') {
      setCharacter(prev => ({
        ...prev,
        currentHp: prev.stats.maxHp,
        currentEn: prev.stats.maxEn,
        currentMag: prev.stats.maxMag
      }));
      const { region, area, localPosition, activity } = lastInn;
      setCurrentRegion(region);
      setCurrentArea(area);
      setCurrentLocalPosition(localPosition);
      setCurrentActivity(activity);
    }
    setInCombat(false);
    setEnemy(null);
  };

  const handleAbilityMenuClose = () => {
    setShowAbilityMenu(false);
  };

  const playerImageSrc = getProfileImageSrc(character);

  return (
    <div className="combat-window">
      <div className="combat-info">
        <div className="combat-character">
          <h2 className="combat-title">{character.name}</h2>
          <p className="combat-level"><span>Level:</span><span>{character.level}</span></p>
          <img src={playerImageSrc} alt={character.name} />
          <div className="combat-stats">
            <p><span>HP:</span><span className="stat-value">{character.currentHp}/{character.stats.maxHp}</span></p>
            <p><span>EN:</span><span className="stat-value">{character.currentEn}/{character.stats.maxEn}</span></p>
            <p><span>MAG:</span><span className="stat-value">{character.currentMag}/{character.stats.maxMag}</span></p>
            <p><span>AR:</span><span className="stat-value">{character.stats.ar}</span></p>
            <p><span>MRES:</span><span className="stat-value">{character.stats.mres}</span></p>
            <p><span>STR:</span><span className="stat-value">{character.stats.str}</span></p>
            <p><span>INT:</span><span className="stat-value">{character.stats.int}</span></p>
            <p><span>CRIT:</span><span className="stat-value">{character.stats.crit}</span></p>
            <p><span>EVA:</span><span className="stat-value">{character.stats.eva}</span></p>
            <p><span>AGI:</span><span className="stat-value">{character.stats.agi}</span></p>
            <p><span>ACC:</span><span className="stat-value">{character.stats.acc}</span></p>
          </div>
        </div>
        <img className="battle-icon" src="./images/crossed-swords-icon.png" alt="Battle Icon" />
        <div className="combat-enemy">
          <h2 className="combat-title">{enemy.name}</h2>
          <p className="combat-level"><span>Level:</span><span>{enemy.level}</span></p>
          <img src={enemy.image} alt={enemy.name} />
          <div className="combat-stats">
            <p><span>HP:</span><span className="stat-value">{enemy.stats.currentHp}/{enemy.stats.maxHp}</span></p>
            <p><span>EN:</span><span className="stat-value">{enemy.stats.currentEn}/{enemy.stats.maxEn}</span></p>
            <p><span>MAG:</span><span className="stat-value">{enemy.stats.currentMag}/{enemy.stats.maxMag}</span></p>
            <p><span>AR:</span><span className="stat-value">{enemy.stats.ar}</span></p>
            <p><span>MRES:</span><span className="stat-value">{enemy.stats.mres}</span></p>
            <p><span>STR:</span><span className="stat-value">{enemy.stats.str}</span></p>
            <p><span>INT:</span><span className="stat-value">{enemy.stats.int}</span></p>
            <p><span>CRIT:</span><span className="stat-value">{enemy.stats.crit}</span></p>
            <p><span>EVA:</span><span className="stat-value">{enemy.stats.eva}</span></p>
            <p><span>AGI:</span><span className="stat-value">{enemy.stats.agi}</span></p>
            <p><span>ACC:</span><span className="stat-value">{enemy.stats.acc}</span></p>
          </div>
        </div>
      </div>
      <div className="combat-log" ref={combatLogRef}>
        {combatLog.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
      <div className="combat-actions">
        <button onClick={handleAttackClick}>Attack</button>
        <button onClick={handleUseClick}>Use</button>
        <button onClick={handleFleeClick}>Flee</button>
      </div>
      {showAbilityMenu && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Select an Ability</h3>
            {character.abilities.map(ability => (
              <button key={ability} onClick={() => { handleAbilityUse(ability); handleAbilityMenuClose(); }}>
                {AbilityData[ability].name}
              </button>
            ))}
          </div>
        </div>
      )}
      {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
    </div>
  );
}
