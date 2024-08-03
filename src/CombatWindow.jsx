import React, { useState, useEffect, useRef } from 'react';
import { useCharacter } from './CharacterContext';
import { calculateDamage } from './utils/calculateDamage';
import { calculateHealing } from './utils/calculateHealing';
import { getProfileImageSrc } from './utils/utils';
import Popup from './common/Popup';
import { AbilityData } from './AbilityData';

export default function CombatWindow({ enemy, setInCombat, setEnemy, setCurrentRegion, setCurrentArea, setCurrentLocalPosition, setCurrentActivity }) {
  const { character, setCharacter, lastInn, gainExperience } = useCharacter();
  const [combatLog, setCombatLog] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showAbilityMenu, setShowAbilityMenu] = useState(false);
  const [playerTurnTime, setPlayerTurnTime] = useState(0);
  const [enemyTurnTime, setEnemyTurnTime] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const combatLogRef = useRef(null);
  const abilityMenuRef = useRef(null);

  useEffect(() => {
    if (combatLogRef.current) {
      combatLogRef.current.scrollTop = combatLogRef.current.scrollHeight;
    }
  }, [combatLog]);

  useEffect(() => {
    if (!isPlayerTurn) {
      handleEnemyTurn();
    }
  }, [isPlayerTurn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (abilityMenuRef.current && !abilityMenuRef.current.contains(event.target)) {
        setShowAbilityMenu(false);
      }
    };

    if (showAbilityMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAbilityMenu]);

  const determineNextTurn = () => {
    const playerAgility = character.stats.agi;
    const enemyAgility = enemy.stats.agi;
    const playerTurnInterval = Math.ceil(100 / playerAgility);
    const enemyTurnInterval = Math.ceil(100 / enemyAgility);

    console.log(`Determining turn: PlayerTurnTime=${playerTurnTime}, EnemyTurnTime=${enemyTurnTime}`);
    console.log(`Player Agility=${playerAgility}, Enemy Agility=${enemyAgility}`);
    console.log(`Player Turn Interval=${playerTurnInterval}, Enemy Turn Interval=${enemyTurnInterval}`);

    if (playerTurnTime <= 0) {
      console.log('Player Turn');
      setIsPlayerTurn(true);
      setPlayerTurnTime(playerTurnInterval);
    } else if (enemyTurnTime <= 0) {
      console.log('Enemy Turn');
      setIsPlayerTurn(false);
      setEnemyTurnTime(enemyTurnInterval);
    }
  };

  const handlePlayerTurn = (ability) => {
    if (!enemy) return;

    const abilityDetails = AbilityData[ability];
    console.log('Ability Details:', abilityDetails);

    // Check if the player has enough resources to use the ability
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
        currentEn: Math.max(0, prev.currentEn - abilityDetails.cost.energy),
        currentMag: Math.max(0, prev.currentMag - abilityDetails.cost.magic),
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

      setCombatLog(prevLog => [
        ...prevLog,
        generateLogMessage('You', enemy.name, result, false)
      ]);

      if (updatedEnemy.stats.currentHp <= 0) {
        const expGained = updatedEnemy.stats.expReward;
        setPopupMessage(`You have defeated the ${enemy.name} and gained ${expGained} experience!`);
        gainExperience(expGained);
        setShowPopup(true);
        return;
      }

      // Update character's resources after using the ability
      setCharacter(prev => ({
        ...prev,
        currentEn: Math.max(0, prev.currentEn - abilityDetails.cost.energy),
        currentMag: Math.max(0, prev.currentMag - abilityDetails.cost.magic),
      }));
    }

    console.log('Result:', result);
    const abilityCastTime = abilityDetails.castTime || 0;
    setPlayerTurnTime(prev => prev + abilityCastTime);
    console.log(`Player used ${ability}. Cast time: ${abilityCastTime}. New PlayerTurnTime: ${playerTurnTime + abilityCastTime}`);
    setIsPlayerTurn(false);
    determineNextTurn();
  };

  const handleEnemyTurn = () => {
    console.log('Handling enemy turn');
    
    // Filter abilities to only include those the enemy has enough resources to use
    const availableAbilities = enemy.abilities.filter(ability => {
      const abilityDetails = AbilityData[ability];
      return enemy.stats.currentEn >= abilityDetails.cost.energy && enemy.stats.currentMag >= abilityDetails.cost.magic;
    });

    // If no abilities can be used, skip the turn
    if (availableAbilities.length === 0) {
      setCombatLog(prevLog => [...prevLog, <div key={prevLog.length}>The enemy does not have enough resources to use any abilities!</div>]);
      setEnemyTurnTime(prev => prev + Math.ceil(100 / enemy.stats.agi)); // Increment enemy turn time
      setIsPlayerTurn(true);
      return;
    }

    const enemyAbility = availableAbilities[Math.floor(Math.random() * availableAbilities.length)];
    const abilityDetails = AbilityData[enemyAbility];

    console.log(`Enemy uses ${enemyAbility}`);
    console.log(`Enemy currentEn before: ${enemy.stats.currentEn}`);
    console.log(`Enemy currentMag before: ${enemy.stats.currentMag}`);

    let result;
    if (abilityDetails.effect(enemy).type === 'heal') {
      result = calculateHealing(enemy, abilityDetails);
      setEnemy(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          currentHp: Math.min(prev.stats.maxHp, prev.stats.currentHp + result.healingAmount),
          currentEn: Math.max(0, prev.stats.currentEn - abilityDetails.cost.energy),
          currentMag: Math.max(0, prev.stats.currentMag - abilityDetails.cost.magic),
        },
      }));
      setCombatLog(prevLog => [
        ...prevLog,
        generateLogMessage(enemy.name, null, result, true)
      ]);
    } else {
      result = calculateDamage(enemy, character, abilityDetails);
      setCharacter(prev => ({
        ...prev,
        currentHp: Math.max(0, prev.currentHp - result.finalDamage),
      }));
      setCombatLog(prevLog => [
        ...prevLog,
        generateLogMessage(enemy.name, 'you', result, true)
      ]);

      if (character.currentHp <= 0) {
        setPopupMessage('You have been defeated...');
        setShowPopup(true);
        return;
      }

      setEnemy(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          currentEn: Math.max(0, prev.stats.currentEn - abilityDetails.cost.energy),
          currentMag: Math.max(0, prev.stats.currentMag - abilityDetails.cost.magic),
        },
      }));
    }

    console.log('Enemy Result:', result);
    const abilityCastTime = abilityDetails.castTime || 0;
    setEnemyTurnTime(prev => prev + abilityCastTime);
    console.log(`Enemy used ${enemyAbility}. Cast time: ${abilityCastTime}. New EnemyTurnTime: ${enemyTurnTime + abilityCastTime}`);
    console.log(`Enemy currentEn after: ${enemy.stats.currentEn}`);
    console.log(`Enemy currentMag after: ${enemy.stats.currentMag}`);
    setIsPlayerTurn(true);
    determineNextTurn();
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
    const enemyAgility = enemy.stats.agi;
    const playerAgility = character.stats.agi; 
    let fleeChance = 50 + (playerAgility - enemyAgility);
    fleeChance += Math.floor(Math.random() * 11) - 5;
    fleeChance = Math.max(0, Math.min(100, fleeChance));

    console.log('fleeChance:', fleeChance);

    if (Math.random() * 100 < fleeChance) {
      setPopupMessage('You successfully fled the battle!');
      setShowPopup(true);
    } else {
      setCombatLog(prevLog => [...prevLog, <div key={prevLog.length}>You failed to flee!</div>]);
      setPlayerTurnTime(playerTurnTime + Math.ceil(100 / playerAgility)); // Increment player turn time
      setIsPlayerTurn(false);
      determineNextTurn();
    }
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
        {isPlayerTurn && (
          <>
            <button onClick={handleAttackClick}>Attack</button>
            <button onClick={handleUseClick}>Use</button>
            <button onClick={handleFleeClick}>Flee</button>
          </>
        )}
      </div>
      {showAbilityMenu && (
        <div className="popup-overlay" onClick={handleAbilityMenuClose}>
          <div className="popup-content" ref={abilityMenuRef} onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-message">Select an Ability</h3>
            {character.abilities.map(ability => (
              <button key={ability} onClick={() => { handlePlayerTurn(ability); handleAbilityMenuClose(); }}>
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
