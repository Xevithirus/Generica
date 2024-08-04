// ClockDisplay.jsx
import React from 'react';
import { useClock } from './GameClock';
import styles from "./ClockDisplay.module.css";

const ClockDisplay = () => {
  const { date } = useClock();

  return (
      <div className={styles.clockDisplay}>
      <p>{`${date.dayOfWeek}, ${date.month} ${date.dayOfMonth}, ${date.year}`}</p>
      <p className={styles.timeOfDay}>{`${date.hour}:${date.minute < 10 ? '0' : ''}${date.minute} ${date.period}`}</p>
      <p>{`${date.season}`}</p>
    </div>
  );
};

export default ClockDisplay;