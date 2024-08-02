// EventTrigger.jsx
import React, { useEffect, useState } from "react";
import { WorldData } from '../WorldData';
import { EnemyData } from '../EnemyData';
import { useCharacter } from '../CharacterContext';
import { calculateStats, growthCoefficients } from '../EnemyData';
import { AbilityData } from '../AbilityData'; // Import AbilityData

const getRandomLevel = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const assignAbilities = (enemy, level) => {
  if (!enemy || !enemy.possibleAbilities) {
    return [];
  }
  const availableAbilities = enemy.possibleAbilities.filter(ability => AbilityData[ability].requiredLevel <= level);
  return availableAbilities;
};

export default function EventTrigger({ setInCombat, currentLocalPosition, currentArea, currentRegion, setIsEventActive, setEnemy }) {
  const [enemy, setEnemyState] = useState(null);
  const [fleeDisabled, setFleeDisabled] = useState(false);

  const { character } = useCharacter(); // Access character stats from context

  useEffect(() => {
    if (currentLocalPosition && currentArea && currentRegion) {
      console.log('Random event triggered');

      const regionData = WorldData[currentRegion];
      const areaData = regionData?.areas[currentArea];
      const localPositionData = areaData?.localPositions[currentLocalPosition];
      const enemies = localPositionData?.enemies;

      if (enemies && enemies.length > 0) {
        const totalWeight = enemies.reduce((sum, enemy) => sum + enemy.spawnRate, 0);
        let random = Math.random() * totalWeight;
        const selectedEnemy = enemies.find(enemy => (random -= enemy.spawnRate) <= 0);

        if (selectedEnemy) {
          const enemyDetails = EnemyData[selectedEnemy.name];
          if (enemyDetails) {
            const levelRange = localPositionData.levelRange;
            const level = getRandomLevel(levelRange.min, levelRange.max);
            const stats = calculateStats(enemyDetails.stats, level, growthCoefficients);
            const abilities = assignAbilities(enemyDetails, level);
            const fullEnemyData = { 
              ...selectedEnemy, 
              ...enemyDetails, 
              level, 
              stats,
              abilities,
              currentHp: stats.maxHp,
              maxHp: stats.maxHp,
              currentEn: stats.maxEn,
              maxEn: stats.maxEn,
              currentMag: stats.maxMag,
              maxMag: stats.maxMag
            };

            console.log('Enemy Stats:', fullEnemyData); // Log enemy stats

            setEnemyState(fullEnemyData);
            setEnemy(fullEnemyData);
            setIsEventActive(true);
          } else {
            console.error(`Enemy details not found for: ${selectedEnemy.name}`);
            setEnemyState(null); // Ensure no enemy state is set
            setEnemy(null);
            setIsEventActive(false);
          }
        } else {
          console.error('No enemy selected');
          setEnemyState(null);
          setEnemy(null);
          setIsEventActive(false);
        }
      } else {
        console.error('No enemies available');
        setEnemyState(null);
        setEnemy(null);
        setIsEventActive(false);
      }
    } else {
      console.log('Random event not triggered');
      setEnemyState(null);
      setEnemy(null);
      setIsEventActive(false);
    }
  }, [currentLocalPosition, currentArea, currentRegion, setIsEventActive]);

  const handleFlee = () => {
    if (!enemy) return;

    console.log('Handling flee');
    const enemyAgility = enemy.stats.agi;
    const playerAgility = character.stats.agi; 
    let fleeChance = 50 + (playerAgility - enemyAgility);
    fleeChance += Math.floor(Math.random() * 11) - 5;
    fleeChance = Math.max(0, Math.min(100, fleeChance));

    console.log('fleeChance:', fleeChance);

    if (Math.random() * 100 < fleeChance) {
      setEnemyState(null); // Update the local state
      setFleeDisabled(false);
      setIsEventActive(false);
      setInCombat(false);
    } else {
      alert("You could not escape!");
      setFleeDisabled(true);
    }
  };

  const handleFight = () => {
    if (!enemy) return;
    setInCombat(true);
    setIsEventActive(false);
  };

  console.log('Rendering with enemy:', enemy);

  return (
    <>
      {enemy ? (
        <div className="event-popup">
          <h3>An enemy <span className="enemy-name-span">{enemy.name}</span> has appeared!</h3>
          <img src={enemy.image} alt={enemy.name} />
          <div className="text-LR-alignment">
            <div className="stats-left">
              <p>Name: {enemy.name}</p>
              <p>Type: {enemy.type}</p> 
              <p>LV: {enemy.level}</p>
            </div>
          </div>
          <br />
          <p className="event-description">{enemy.description}</p>
          <div className="button-container">   
            <button className="event-button" onClick={handleFight}>Fight</button>
            <button className={`event-button ${fleeDisabled ? 'disabled' : ''}`} onClick={handleFlee} disabled={fleeDisabled}>Flee</button>
          </div>       
        </div>
      ) : (
        <p>No enemy data to display</p>
      )}
    </>
  );
}
