// Sidebar.jsx
import React from 'react';
import { useCharacter } from '../CharacterContext';

const Sidebar = () => {
  const { character } = useCharacter();

  const capitalizeField = (field) => {
    return field ? field.charAt(0).toUpperCase() + field.slice(1).toLowerCase() : '';
  };

  const getImageSrc = () => {
    const { sex, job } = character;
    if (!sex || !job) return '../images/adventurer-female.png'; 
    return `../images/${job}-${sex}.png`;
  };

  console.log('Sidebar Character:', character); // Log character data

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">{character.name.toUpperCase()}</h1>
      <img src={getImageSrc()} alt="Profile Picture" />
      <p>{`Name: ${character.name}`}</p>
      <p>{`Sex: ${capitalizeField(character.sex)}`}</p>
      <p>{`Job: ${capitalizeField(character.job)}`}</p>
      <p>{`Level: ${character.level}`}</p>
      <p>{`Experience: ${character.experience}/${character.experienceToNextLevel}`}</p>
      <br />
      <div className="stat-container"><span>Health:</span><span>{character.currentHp}/{character.stats.maxHp}</span></div>
      <div className="stat-container"><span>Energy:</span><span>{character.currentEn}/{character.stats.maxEn}</span></div>
      <div className="stat-container"><span>Magic:</span><span>{character.currentMag}/{character.stats.maxMag}</span></div>
      <div className="stat-container"><span>Armor:</span><span>{character.stats.ar}</span></div>
      <div className="stat-container"><span>Magic Resist:</span><span>{character.stats.mres}</span></div>
      <div className="stat-container"><span>Strength:</span><span>{character.stats.str}</span></div>
      <div className="stat-container"><span>Intellect:</span><span>{character.stats.int}</span></div>
      <div className="stat-container"><span>Critical:</span><span>{character.stats.crit}</span></div>
      <div className="stat-container"><span>Evasion:</span><span>{character.stats.eva}</span></div>
      <div className="stat-container"><span>Agility:</span><span>{character.stats.agi}</span></div>
      <div className="stat-container"><span>Accuracy:</span><span>{character.stats.acc}</span></div>
      <div className="inventory">
        <h3>Inventory</h3>
        <div className="text-box">
          <ul>
            <li>{`[1] Items`}</li>
            <li>{`[2] To`}</li>
            <li>{`[3] Be`}</li>
            <li>{`[4] Put`}</li>
            <li>{`[5] Here`}</li>
          </ul>
        </div>
        <div className="money-container">
          <p>GOLD: 16g</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
