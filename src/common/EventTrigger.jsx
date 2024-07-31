import React, { useEffect, useState } from "react";
import { WorldData } from '../WorldData';
import { EnemyData } from '../EnemyData'; 
import { calculateStats, baseStats } from '../EnemyData';

function getRandomLevel(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function EventTrigger({ currentLocalPosition, currentArea, currentRegion, setIsEventActive }) {
  const [enemy, setEnemy] = useState(null);
  const [fleeDisabled, setFleeDisabled] = useState(false);

  const playerAgility = 20; // Example player agility, replace with actual player agility once made dynamic

  useEffect(() => {
    if (currentLocalPosition && currentArea && currentRegion) {
      if (Math.random() > 0.4) {
        const regionData = WorldData[currentRegion];
        const areaData = regionData.areas[currentArea];
        const localPositionData = areaData.localPositions[currentLocalPosition];
        const enemies = localPositionData?.enemies;

        if (enemies && enemies.length > 0) {
          const totalWeight = enemies.reduce((sum, enemy) => sum + enemy.spawnRate, 0);
          let random = Math.random() * totalWeight;
          const selectedEnemy = enemies.find(enemy => (random -= enemy.spawnRate) <= 0);

          if (selectedEnemy) {
            const enemyDetails = EnemyData[selectedEnemy.name];
            const levelRange = localPositionData.levelRange;
            const level = getRandomLevel(levelRange.min, levelRange.max);
            const stats = calculateStats(enemyDetails.baseStats, level);
            setEnemy({ ...selectedEnemy, ...enemyDetails, level, stats });
            setIsEventActive(true);
          }
        }
      }
    }
  }, [currentLocalPosition, currentArea, currentRegion, setIsEventActive]);

  const handleFlee = () => {
    if (!enemy) return;

    const enemyAgility = enemy.stats.agi;
    let fleeChance = 50 + (playerAgility - enemyAgility);
    fleeChance += Math.floor(Math.random() * 11) - 5;
    fleeChance = Math.max(0, Math.min(100, fleeChance));

    if (Math.random() * 100 < fleeChance) {
      setEnemy(null);
      setFleeDisabled(false);
      setIsEventActive(false);
    } else {
      alert("You could not escape!");
      setFleeDisabled(true);
    }
  };

  const handleFight = () => {
    if (!enemy) return;
    
    setEnemy(null);
    setFleeDisabled(false);
    setIsEventActive(false);
  };

  return (
    <>
      {enemy && (
        <div className="event-popup">
          <h3>An enemy <span className="enemy-name-span">{enemy.name}</span> has appeared!</h3>
          <img src={enemy.image} alt={enemy.name} />
          <div className="text-LR-alignment">
            <div className="stats-left">
              <p>Name: {enemy.name}</p>
              <p>Type: {enemy.type}</p> 
              <p>LV: {enemy.level}</p>
              <p>HP: {enemy.stats.hp}</p>
              <p>EN: {enemy.stats.en}</p>
              <p>MAG: {enemy.stats.mag}</p>
            </div>
            <div className="stats-left">
              <p>STR: {enemy.stats.str}</p>
              <p>AGI: {enemy.stats.agi}</p>           
              <p>INT: {enemy.stats.int}</p>                   
            </div>
          </div>
          <div className="button-container">   
            <button className="event-button" onClick={handleFight}>Fight</button>
            <button className={`event-button ${fleeDisabled ? 'disabled' : ''}`} onClick={handleFlee} disabled={fleeDisabled}>Flee</button>
          </div>       
        </div>
      )}
    </>
  );
}
