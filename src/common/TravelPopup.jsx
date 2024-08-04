import React, { useState, useEffect } from 'react';
import styles from './TravelPopup.module.css';

const TravelPopup = ({ show, text }) => {
  const [dots, setDots] = useState('');
  const [showTravelMessage, setShowTravelMessage] = useState(false);

  useEffect(() => {
    let interval;
    if (show) {
      setDots(''); // Reset dots when popup is shown
      setShowTravelMessage(false);

      // Show the message after the screen fades to black
      const messageTimeout = setTimeout(() => {
        setShowTravelMessage(true);
        interval = setInterval(() => {
          setDots(prevDots => {
            if (prevDots.length < 3) {
              return prevDots + '.';
            } else {
              return '';
            }
          });
        }, 1000); // Update dots every second
      }, 1000); // Delay message appearance by 1 second

      return () => {
        clearTimeout(messageTimeout);
        clearInterval(interval);
      };
    }
  }, [show]);

  return (
    <div className={`${styles.travelPopup} ${show ? styles.show : ''}`}>
      {showTravelMessage && <h2>{text}<span className={styles.dots}>{dots}</span></h2>}
    </div>
  );
};

export default TravelPopup;
