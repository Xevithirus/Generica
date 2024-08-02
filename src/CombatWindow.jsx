import React, { useState, useEffect, useRef } from 'react';
import { useCharacter } from './CharacterContext';
import { calculateDamage } from './utils/calculateDamage'; 
import { getProfileImageSrc } from './utils/utils';
import Popup from './common/Popup';

export default function CombatWindow({ enemy, setInCombat, setEnemy, setCurrentRegion, setCurrentArea, setCurrentLocalPosition, setCurrentActivity }) {
  const { character, setCharacter, lastInn } = useCharacter(); // Access character stats and lastInn from context
  const [combatLog, setCombatLog] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const combatLogRef = useRef(null);

  if (!enemy) {
    console.log('No enemy data received');
    return <p>No enemy data to display</p>; // Display message if no enemy data
  }

  console.log('Enemy data:', enemy);

  useEffect(() => {
    if (combatLogRef.current) {
      combatLogRef.current.scrollTop = combatLogRef.current.scrollHeight;
    }
  }, [combatLog]);

  const handleAttackClick = () => {
    if (!enemy) return; // Ensure enemy exists

    console.log('Character stats:', character.stats);
    console.log('Enemy stats:', enemy.stats);

    const validatedCharacterStats = validateStats(character.stats);
    const validatedEnemyStats = validateStats(enemy.stats);

    const playerAttack = calculateDamage({ ...character, stats: validatedCharacterStats }, { ...enemy, stats: validatedEnemyStats }, 'physical'); // or 'magic' or 'mixed'
    const enemyAttack = calculateDamage({ ...enemy, stats: validatedEnemyStats }, { ...character, stats: validatedCharacterStats }, 'physical'); // or 'magic' or 'mixed'

    console.log('Player attack:', playerAttack);
    console.log('Enemy attack:', enemyAttack);

    const updatedCharacter = {
      ...character,
      currentHp: Math.max(0, character.currentHp - enemyAttack.finalDamage),
    };

    const updatedEnemy = {
      ...enemy,
      stats: {
        ...enemy.stats,
        currentHp: Math.max(0, enemy.stats.currentHp - playerAttack.finalDamage),
      },
    };

    setCharacter(updatedCharacter);
    setEnemy(updatedEnemy);

    const playerLogMessage = generateLogMessage('You', enemy.name, playerAttack, false);
    const enemyLogMessage = generateLogMessage(enemy.name, 'you', enemyAttack, true);

    setCombatLog(prevLog => [
      ...prevLog,
      playerLogMessage,
      enemyLogMessage
    ]);

    // Check win/loss conditions
    if (updatedEnemy.stats.currentHp <= 0) {
      setPopupMessage(`You have defeated the ${enemy.name}!`);
      setShowPopup(true);
    } else if (updatedCharacter.currentHp <= 0) {
      setPopupMessage('You have been defeated...');
      setShowPopup(true);
    }
  };

  const validateStats = (stats) => {
    return {
      ...stats,
      hp: stats.hp || 0,
      en: stats.en || 0,
      mag: stats.mag || 0,
      ar: stats.ar || 0,
      mres: stats.mres || 0,
      str: stats.str || 0,
      int: stats.int || 0,
      crit: stats.crit || 0,
      eva: stats.eva || 0,
      agi: stats.agi || 0,
      acc: stats.acc || 0,
      weaponMultiplier: stats.weaponMultiplier || 1, // Ensure weaponMultiplier has a default value
      magicMultiplier: stats.magicMultiplier || 1  // Ensure magicMultiplier has a default value
    };
  };

  const generateLogMessage = (attackerName, defenderName, attackDetails, isEnemyAttacking) => {
    let logMessage;
    if (!attackDetails.didHit) {
      logMessage = <div>{attackerName} missed!</div>;
    } else {
      if (isEnemyAttacking) {
        logMessage = (
          <div>
            <p>The {attackerName} attacks {defenderName} for <span>{attackDetails.finalDamage}</span> {attackDetails.damageType} damage! {attackDetails.mitigatedAmount} damage was mitigated. You take <span style={{ color: 'red' }}>{Math.max(0, attackDetails.finalDamage - attackDetails.mitigatedAmount)}</span> damage!</p>
            {attackDetails.isCritical && <p><span style={{ color: 'yellow' }}> Critical Hit!</span></p>}
          </div>
        );
      } else {
        logMessage = (
          <div>
            <p>You attack the {defenderName} for <span>{attackDetails.finalDamage}</span> {attackDetails.damageType} damage! {attackDetails.mitigatedAmount} damage was mitigated. The {defenderName.charAt(0).toUpperCase() + defenderName.slice(1)} takes <span style={{ color: '#00ff00' }}>{Math.max(0, attackDetails.finalDamage - attackDetails.mitigatedAmount)}</span> damage!</p>
            {attackDetails.isCritical && <p><span style={{ color: 'yellow' }}> Critical Hit!</span></p>}
          </div>
        );
      }
    }
    return logMessage;
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

  const playerImageSrc = getProfileImageSrc(character);

  return (
    <div className="combat-window">
      <div className="combat-info">
        <div className="combat-character">
          <h2 className="combat-title">{character.name}</h2>
          <p className="combat-level"><span>Level:</span><span>{character.level}</span></p>
          <img src={playerImageSrc} />
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
        <img className="battle-icon" src="./images/crossed-swords-icon.png" />
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
      {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
    </div>
  );
}
