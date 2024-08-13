import React, { useState } from 'react';
import { useCharacter } from './CharacterContext';
import styles from './CharacterCreationForm.module.css';

const CharacterCreationForm = () => {
  const { handleCharacterCreation } = useCharacter();
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [sex, setSex] = useState('');

  const MAX_NAME_LENGTH = 17; // Set the maximum length for the name

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && job && sex) {
      handleCharacterCreation(name, job, sex);
    } else {
      alert('Complete character creation to start your adventure...');
    }
  };

  const handleNameChange = (e) => {
    if (e.target.value.length <= MAX_NAME_LENGTH) {
      setName(e.target.value);
    }
  };

  return (
    <div className={styles.characterCreationForm}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>Create your character</h1>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} maxLength={MAX_NAME_LENGTH} />
        </label>
        <label>
          Sex:
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value=""></option>
            <option value="male">♂️ Male</option>
            <option value="female">♀️ Female</option>
          </select>
        </label>
        <label>
          Job:
          <select value={job} onChange={(e) => setJob(e.target.value)}>
            <option value=""></option>
            <option value="warrior">🛡️ Warrior</option>
            <option value="witch">☄️ Witch</option>
            <option value="rogue">🗡️ Rogue</option>
            <option value="cleric">⚕️ Cleric</option>
            <option value="paladin">⚔️ Paladin</option>
            {/* <option value="ranger">🏹 Ranger</option> */}
          </select>
        </label>
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default CharacterCreationForm;
