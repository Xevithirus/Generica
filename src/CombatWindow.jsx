import React, { useState, useEffect, useRef } from 'react';
import { useCharacter } from './CharacterContext';
import { calculateDamage } from './utils/calculateDamage';
import { calculateHealing } from './utils/calculateHealing';
import { getProfileImageSrc } from './utils/utils';
import Popup from './common/Popup';
import { AbilityData } from './AbilityData';
import { EffectData } from './EffectData';

export default function CombatWindow({
  enemy,
  setInCombat,
  setEnemy,
  setCurrentRegion,
  setCurrentArea,
  setCurrentLocalPosition,
  setCurrentActivity,
  triggerTravelPopup,
  setTravelText,
}) {
  const { character, setCharacter, lastGraveyard, gainExperience } = useCharacter();
  const [combatLog, setCombatLog] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showAbilityMenu, setShowAbilityMenu] = useState(false);
  const [playerTurnTime, setPlayerTurnTime] = useState(0);
  const [enemyTurnTime, setEnemyTurnTime] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(null); // Initially null to determine the first turn
  const combatLogRef = useRef(null);
  const abilityMenuRef = useRef(null);

  useEffect(() => {
    if (combatLogRef.current) {
      combatLogRef.current.scrollTop = combatLogRef.current.scrollHeight;
    }
  }, [combatLog]);

  useEffect(() => {
    if (isPlayerTurn === false) {
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

  useEffect(() => {
    // Determine the initial turn order based on agility
    const playerAgility = character.stats.agi;
    const enemyAgility = enemy.stats.agi;

    if (playerAgility >= enemyAgility) {
      setIsPlayerTurn(true);
      const playerTurnInterval = Math.ceil(100 / playerAgility);
      setPlayerTurnTime(playerTurnInterval);
    } else {
      setIsPlayerTurn(false);
      const enemyTurnInterval = Math.ceil(100 / enemyAgility);
      setEnemyTurnTime(enemyTurnInterval);
      handleEnemyTurn(); // Directly handle the enemy turn if they go first
    }
  }, [character.stats.agi, enemy.stats.agi]);

  useEffect(() => {
    const checkPlayerHp = async () => {
      if (character.currentHp <= 0) {
        setPopupMessage('You have been defeated...');
        setShowPopup(true);
      }
    };

    checkPlayerHp();
  }, [character.currentHp]);

  const determineNextTurn = () => {
    const playerAgility = character.stats.agi;
    const enemyAgility = enemy.stats.agi;
    const playerTurnInterval = Math.ceil(100 / playerAgility);
    const enemyTurnInterval = Math.ceil(100 / enemyAgility);

    if (playerTurnTime <= 0) {
      setIsPlayerTurn(true);
      setPlayerTurnTime(playerTurnInterval);
    } else if (enemyTurnTime <= 0) {
      setIsPlayerTurn(false);
      setEnemyTurnTime(enemyTurnInterval);
    }
  };

  const handlePlayerTurn = (ability) => {
    if (!enemy) return;

    const abilityDetails = AbilityData[ability];

    // Check if the player has enough resources to use the ability
    if (character.currentEn < abilityDetails.cost.energy || character.currentMag < abilityDetails.cost.magic) {
      setCombatLog((prevLog) => [
        ...prevLog,
        <div key={prevLog.length}>You do not have enough resources to use {abilityDetails.name}!</div>,
      ]);
      return;
    }

    let result = {};
    if (abilityDetails.healing) {
      result = calculateHealing(character, abilityDetails);
      setCharacter((prev) => ({
        ...prev,
        currentHp: Math.min(prev.stats.maxHp, prev.currentHp + result.healingAmount),
        currentEn: Math.max(0, prev.currentEn - abilityDetails.cost.energy),
        currentMag: Math.max(0, prev.currentMag - abilityDetails.cost.magic),
      }));
      setCombatLog((prevLog) => [...prevLog, generateLogMessage('You', null, result, false)]);
    } else if (abilityDetails.damage) {
      result = calculateDamage(character, enemy, abilityDetails);
      const updatedEnemy = {
        ...enemy,
        stats: {
          ...enemy.stats,
          currentHp: Math.max(0, enemy.stats.currentHp - result.finalDamage),
        },
      };

      setEnemy(updatedEnemy);

      setCombatLog((prevLog) => [
        ...prevLog,
        generateLogMessage('You', enemy.name, result, false),
      ]);

      if (updatedEnemy.stats.currentHp <= 0) {
        const expGained = updatedEnemy.stats.expReward;
        setPopupMessage(`You have defeated the ${enemy.name} and gained ${expGained} experience!`);
        gainExperience(expGained);
        setShowPopup(true);
        return;
      }

      // Apply special effects like stun
      if (abilityDetails.effect) {
        const effectDetails = abilityDetails.effect(character, enemy);
        if (effectDetails.stun) {
          const stunApplied = EffectData.stun.apply(
            updatedEnemy,
            effectDetails.stun.duration,
            effectDetails.stun.chance
          );
          setCombatLog((prevLog) => [
            ...prevLog,
            <div key={prevLog.length}>{stunApplied ? 'The enemy is stunned!' : 'The stun attempt failed.'}</div>,
          ]);
        }
      }

      // Update character's resources after using the ability
      setCharacter((prev) => ({
        ...prev,
        currentEn: Math.max(0, prev.currentEn - abilityDetails.cost.energy),
        currentMag: Math.max(0, prev.currentMag - abilityDetails.cost.magic),
      }));
    }

    const abilityCastTime = abilityDetails.castTime || 0;
    setPlayerTurnTime((prev) => prev + abilityCastTime);

    setIsPlayerTurn(false);
    determineNextTurn();
  };

  const handleEnemyTurn = async () => {
    // Check if the player is already dead before the enemy turn starts
    if (character.currentHp <= 0) {
      setPopupMessage('You have been defeated...');
      setShowPopup(true);
      return;
    }

    // Check if the enemy is stunned
    if (EffectData.stun.isStunned(enemy)) {
      setCombatLog((prevLog) => [
        ...prevLog,
        <div key={prevLog.length}>The enemy is stunned and skips their turn!</div>,
      ]);
      EffectData.stun.tick(enemy);
      setIsPlayerTurn(true);
      determineNextTurn();
      return;
    }

    // Filter abilities to only include those the enemy has enough resources to use
    const availableAbilities = enemy.abilities.filter((ability) => {
      const abilityDetails = AbilityData[ability];
      return (
        enemy.stats.currentEn >= abilityDetails.cost.energy && enemy.stats.currentMag >= abilityDetails.cost.magic
      );
    });

    // If no abilities can be used, skip the turn
    if (availableAbilities.length === 0) {
      setCombatLog((prevLog) => [
        ...prevLog,
        <div key={prevLog.length}>The enemy does not have enough resources to use any abilities!</div>,
      ]);
      setEnemyTurnTime((prev) => prev + Math.ceil(100 / enemy.stats.agi)); // Increment enemy turn time
      setIsPlayerTurn(true);
      return;
    }

    const enemyAbility = availableAbilities[Math.floor(Math.random() * availableAbilities.length)];
    const abilityDetails = AbilityData[enemyAbility];

    // Add a delay before executing the enemy's action
    await new Promise((resolve) => setTimeout(resolve, 1200));

    let result = {};
    if (abilityDetails.healing) {
      result = calculateHealing(enemy, abilityDetails);
      setEnemy((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          currentHp: Math.min(prev.stats.maxHp, prev.stats.currentHp + result.healingAmount),
          currentEn: Math.max(0, prev.stats.currentEn - abilityDetails.cost.energy),
          currentMag: Math.max(0, prev.stats.currentMag - abilityDetails.cost.magic),
        },
      }));
      setCombatLog((prevLog) => [
        ...prevLog,
        generateLogMessage(enemy.name, null, result, true),
      ]);
    } else if (abilityDetails.damage) {
      result = calculateDamage(enemy, character, abilityDetails);
      setCharacter((prev) => ({
        ...prev,
        currentHp: Math.max(0, prev.currentHp - result.finalDamage),
      }));
      setCombatLog((prevLog) => [
        ...prevLog,
        generateLogMessage(enemy.name, 'you', result, true),
      ]);

      if (character.currentHp <= 0) {
        setPopupMessage('You have been defeated...');
        setShowPopup(true);
        return;
      }

      setEnemy((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          currentEn: Math.max(0, prev.stats.currentEn - abilityDetails.cost.energy),
          currentMag: Math.max(0, prev.stats.currentMag - abilityDetails.cost.magic),
        },
      }));
    }

    const abilityCastTime = abilityDetails.castTime || 0;
    setEnemyTurnTime((prev) => prev + abilityCastTime);

    setIsPlayerTurn(true);
    determineNextTurn();
  };

  const generateLogMessage = (attackerName, defenderName, attackDetails, isEnemyAttacking) => {
    if (attackDetails.effectType === 'heal') {
      const healAmount = attackDetails.healingAmount;
      return (
        <div key={combatLog.length}>
          {isEnemyAttacking
            ? `The ${attackerName} heals for ${healAmount} health!`
            : `You heal for ${healAmount} health!`}
        </div>
      );
    } else if (!attackDetails.didHit) {
      return <div key={combatLog.length}>{attackerName} missed!</div>;
    } else {
      const damageColor = isEnemyAttacking ? 'red' : '#00ff00';
      const baseDamage = attackDetails.baseDamage;
      const mitigatedAmount = attackDetails.mitigatedAmount;
      const finalDamage = attackDetails.finalDamage;

      return (
        <div key={combatLog.length}>
          <p>
            {isEnemyAttacking
              ? `The ${attackerName} attacks you for ${baseDamage} ${attackDetails.damageType} damage! ${mitigatedAmount} damage was mitigated.`
              : `You attack the ${defenderName} for ${baseDamage} ${attackDetails.damageType} damage! ${mitigatedAmount} damage was mitigated.`}
          </p>
          <p>{isEnemyAttacking ? `You take ${finalDamage} damage!` : `The ${defenderName} takes ${finalDamage} damage!`}</p>
          {attackDetails.isCritical && <p><span style={{ color: 'yellow' }}>Critical Strike!</span></p>}
        </div>
      );
    }
  };

  const handleAttackClick = () => {
    setShowAbilityMenu(true);
  };

  const handleUseClick = () => {
    console.log('Opened Use Menu...');
  };

  const handleFleeClick = () => {
    const enemyAgility = enemy.stats.agi;
    const playerAgility = character.stats.agi;
    let fleeChance = 50 + (playerAgility - enemyAgility);
    fleeChance += Math.floor(Math.random() * 11) - 5;
    fleeChance = Math.max(0, Math.min(100, fleeChance));

    if (Math.random() * 100 < fleeChance) {
      setPopupMessage('You successfully fled the battle!');
      setShowPopup(true);
    } else {
      setCombatLog((prevLog) => [
        ...prevLog,
        <div key={prevLog.length}>You failed to flee!</div>,
      ]);
      setPlayerTurnTime(playerTurnTime + Math.ceil(100 / playerAgility)); // Increment player turn time
      setIsPlayerTurn(false);
      determineNextTurn();
    }
  };

  const handleClosePopup = async () => {
    setShowPopup(false);
    if (popupMessage.includes('You have been defeated...')) {
      setTravelText('Travelling to the graveyard'); // Set travel text for graveyard
      await triggerTravelPopup(() => {
        setCharacter((prev) => ({
          ...prev,
          currentHp: prev.stats.maxHp,
          currentEn: prev.stats.maxEn,
          currentMag: prev.stats.maxMag,
        }));
        const { region, area, localPosition, activity } = lastGraveyard;
        setCurrentRegion(region);
        setCurrentArea(area);
        setCurrentLocalPosition(localPosition);
        setCurrentActivity(activity);
      });
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
          <img
            src={playerImageSrc}
            alt={character.name}
            style={{
              boxShadow: isPlayerTurn ? '0px 0px 25px 15px #ffd900' : '0px 0px 25px 10px rgba(0, 0, 0, 1)',
            }}
          />
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
          <img
            src={enemy.image}
            alt={enemy.name}
            style={{
              boxShadow: !isPlayerTurn ? '0px 0px 25px 15px #ffd900' : '0px 0px 25px 10px rgba(0, 0, 0, 1)',
            }}
          />
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
        <button onClick={handleAttackClick} disabled={!isPlayerTurn}>Attack</button>
        <button onClick={handleUseClick} disabled={!isPlayerTurn}>Use</button>
        <button onClick={handleFleeClick} disabled={!isPlayerTurn}>Flee</button>
      </div>
      {showAbilityMenu && (
        <div className="popup-overlay" onClick={handleAbilityMenuClose}>
          <div className="popup-content" ref={abilityMenuRef} onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-message">Select an Ability</h3>
            {character.abilities.map((ability) => (
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
