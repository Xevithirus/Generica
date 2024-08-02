import React, { useState, useEffect, useRef } from 'react';
import { useCharacter } from './CharacterContext';
import { getProfileImageSrc } from './utils/utils';

export default function CombatWindow({ enemy, setInCombat, setEnemy }) {
  const { character } = useCharacter(); // Access character stats from context
  const [combatLog, setCombatLog] = useState([]);
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

  // Function to handle attacking
  const handleAttackClick = () => {
    if (!enemy) return; // Ensure enemy exists

    const attackRoll = Math.random() * character.stats.acc;
    const evadeRoll = Math.random() * enemy.stats.eva;

    if (attackRoll > evadeRoll) {
      const characterDamage = Math.max(character.stats.ap - enemy.stats.ar, 0);
      const enemyDamage = Math.max(enemy.stats.ap - character.stats.ar, 0);

      setCombatLog(prevLog => [
        ...prevLog,
        `You attack the ${enemy.name} for ${characterDamage} damage!`,
        `${enemy.name} attacks you for ${enemyDamage} damage!`
      ]);

      // Update health stats and check win/loss conditions
      if (enemy.stats.hp <= 0) {
        setCombatLog(prevLog => [...prevLog, `You defeated the ${enemy.name}!`]);
        setEnemy(null); // Clear the enemy after defeat
        setInCombat(false); // Exit combat state
      } else if (character.stats.hp <= 0) {
        setCombatLog(prevLog => [...prevLog, `You were defeated by the ${enemy.name}.`]);
        setInCombat(false); // Exit combat state
      }
    }
  };

  // Function to handle using Items
  const handleUseClick = () => {
    console.log("Opened Use Menu...");
  };

  // Function to handle fleeing
  const handleFleeClick = () => {
    console.log("Attempting to flee...");
    setEnemy(null); // Clear enemy and exit combat state
    setInCombat(false);
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
            <p><span>HP:</span><span className="stat-value">{character.stats.hp}</span></p>
            <p><span>EN:</span><span className="stat-value">{character.stats.en}</span></p>
            <p><span>MAG:</span><span className="stat-value">{character.stats.mag}</span></p>
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
        <img className="battle-icon" src={ "./images/crossed-swords-icon.png" } />   
        <div className="combat-enemy">
          <h2 className="combat-title">{enemy.name}</h2>
          <p className="combat-level"><span>Level:</span><span>{enemy.level}</span></p>
          <img src={enemy.image} alt={enemy.name} />
          <div className="combat-stats">
            <p><span>HP:</span><span className="stat-value">{enemy.stats.hp}</span></p>
            <p><span>EN:</span><span className="stat-value">{enemy.stats.en}</span></p>
            <p><span>MAG:</span><span className="stat-value">{enemy.stats.mag}</span></p>
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
          <p key={index}>{log}</p>
        ))}
      </div>
      <div className="combat-actions">
        <button onClick={handleAttackClick}>Attack</button>
        <button onClick={handleUseClick}>Use</button>
        <button onClick={handleFleeClick}>Flee</button>
      </div>
    </div>
  );
}
