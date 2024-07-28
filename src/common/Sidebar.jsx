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
      <p>{`LV: ${character.level}`}</p>
      <p>{`XP: 120/1000`}</p>
      <br />
      <p>{`HP: ${character.stats.hp}`}</p>
      <p>{`ENG: ${character.stats.eng}`}</p>
      <p>{`MAG: ${character.stats.mag}`}</p>
      <p>{`STR: ${character.stats.str}`}</p>
      <p>{`AGI: ${character.stats.agi}`}</p>
      <p>{`INT: ${character.stats.int}`}</p>
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
