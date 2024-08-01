import React, { useState } from 'react';
import { useCharacter } from './CharacterContext';

export default function CombatWindow({ enemy, setInCombat, setEnemy }) {
  const { character } = useCharacter(); // Access character stats from context
  const [combatLog, setCombatLog] = useState([]);

  if (!enemy) {
    console.log('No enemy data received');
    return <p>No enemy data to display</p>; // Display message if no enemy data
  }

  console.log('Enemy data:', enemy);

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

  return (
    <div className="combat-window">
      <div className="combat-info">
        <div className="combat-character">
          <h2>{character.name}</h2>
          <p>Level: {character.level}</p>
          <p>HP: {character.stats.hp}</p>
          <p>AP: {character.stats.ap}</p>
          <p>EN: {character.stats.en}</p>
          <p>MAG: {character.stats.mag}</p>
          <p>AR: {character.stats.ar}</p>
          <p>MRES: {character.stats.mres}</p>
          <p>CRIT: {character.stats.crit}</p>
          <p>EVA: {character.stats.eva}</p>
          <p>AGI: {character.stats.agi}</p>
          <p>ACC: {character.stats.acc}</p>
        </div>
        <div className="combat-enemy">
          <h2>{enemy.name}</h2>
          <p>Level: {enemy.level}</p>
          <p>HP: {enemy.stats.hp}</p>
          <p>AP: {enemy.stats.ap}</p>
          <p>EN: {enemy.stats.en}</p>
          <p>MAG: {enemy.stats.mag}</p>
          <p>AR: {enemy.stats.ar}</p>
          <p>MRES: {enemy.stats.mres}</p>
          <p>CRIT: {enemy.stats.crit}</p>
          <p>EVA: {enemy.stats.eva}</p>
          <p>AGI: {enemy.stats.agi}</p>
          <p>ACC: {enemy.stats.acc}</p>
        </div>
      </div>
      <div className="combat-log">
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
