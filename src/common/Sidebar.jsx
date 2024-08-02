// Sidebar.jsx
import React from 'react';
import { useCharacter } from '../CharacterContext';

const Sidebar = () => {
  const { character } = useCharacter();

// Capitalize job and sex values
const capitalizeField = (job, sex) => {
  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  if (!job && !sex) return '';

  const capitalizedJob = job ? capitalize(job) : '';
  const capitalizedSex = sex ? capitalize(sex) : '';

  return `${capitalizedJob} ${capitalizedSex}`.trim();
};

  // Determine the profile image source
  const getImageSrc = () => {
    const { sex, job } = character;
    if (!sex || !job) return '../images/adventurer-female.png'; // Default image
    return `../images/${job}-${sex}.png`;
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">{character.name.toUpperCase()}</h1>
      <img src={getImageSrc()} alt="Profile Picture" />
      <p>{`Name: ${character.name}`}</p>
      <p>{`Sex: ${capitalizeField(character.sex)}`}</p>
      <p>{`Job: ${capitalizeField(character.job)}`}</p>
      <p>{`Level: ${character.level}`}</p>
      <p>{`Experience: 120/1000`}</p>
      <br />
      <div className="stat-container"><span>Health:</span><span>{character.stats.hp}</span></div>
      <div className="stat-container"><span>Energy:</span><span>{character.stats.en}</span></div>
      <div className="stat-container"><span>Magic:</span><span>{character.stats.mag}</span></div>
      <div className="stat-container"><span>Armor:</span><span>{character.stats.ar || 0}</span></div>
      <div className="stat-container"><span>Magic Resist:</span><span>{character.stats.mres || 0}</span></div>
      <div className="stat-container"><span>Strength:</span><span>{character.stats.str || 0}</span></div>
      <div className="stat-container"><span>Intellect:</span><span>{character.stats.int || 0}</span></div>
      <div className="stat-container"><span>Critical:</span><span>{character.stats.crit || 0}</span></div>
      <div className="stat-container"><span>Evasion:</span><span>{character.stats.eva || 0}</span></div>
      <div className="stat-container"><span>Agility:</span><span>{character.stats.agi}</span></div>
      <div className="stat-container"><span>Accuracy:</span><span>{character.stats.acc || 0}</span></div>
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
