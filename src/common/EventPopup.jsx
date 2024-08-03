// EventPopup.jsx
import React from 'react';
import styles from './EventPopup.module.css';

const EventPopup = ({ message, onClose }) => {
  return (
    <div className={styles.eventPopupOverlay}>
      <div className={styles.eventPopupContent}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default EventPopup;
