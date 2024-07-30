import React from 'react';
import { useCharacter } from '../CharacterContext';

const Sidebar = () => {
  const { character } = useCharacter();

  const getImageSrc = () => {
    const { sex, job } = character;
    if (!sex || !job) return '../images/adventurer-female.png';
    return `../images/${job}-${sex}.png`;
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">{character.name.toUpperCase()}</h1>
      <img src={getImageSrc()} alt="Profile Picture" />
      <p>{`Name: ${character.name}`}</p>
      <p>{`Sex: ${character.sex}`}</p>
      <p>{`Job: ${character.job}`}</p>
      <p>{`Level: ${character.level}`}</p>
      <p>{`Experience: 120/1000`}</p>
      <br />
      <div className="stat-container"><span>Health:</span><span>{character.stats.hp}</span></div>
      <div className="stat-container"><span>Energy:</span><span>{character.stats.en}</span></div>
      <div className="stat-container"><span>Magic:</span><span>{character.stats.mag}</span></div>
      <div className="stat-container"><span>Strength:</span><span>{character.stats.str}</span></div>
      <div className="stat-container"><span>Agility:</span><span>{character.stats.agi}</span></div>
      <div className="stat-container"><span>Intellect:</span><span>{character.stats.int}</span></div>
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
