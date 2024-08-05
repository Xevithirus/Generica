import React, { useState, useEffect } from 'react';
import Sidebar from './common/Sidebar';
import LocationScreen from './LocationScreen';
import { WorldData } from './WorldData';
import EventTrigger from './common/EventTrigger';
import CombatWindow from './CombatWindow';
import { useCharacter } from './CharacterContext'; 
import TravelPopup from './common/TravelPopup';
import { useClock } from './common/GameClock';
import ClockDisplay from './common/ClockDisplay';
import useAudio from './common/useAudio';
import { useHealthCheck } from './utils/healthCheck';
import './App.css';

const Game = () => {
  const [currentRegion, setCurrentRegion] = useState('faldor');
  const [currentArea, setCurrentArea] = useState('darda');
  const [currentLocalPosition, setCurrentLocalPosition] = useState(null);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupList, setPopupList] = useState([]);
  const [popupType, setPopupType] = useState('');
  const [isEventActive, setIsEventActive] = useState(false);
  const [enemy, setEnemy] = useState(null);
  const [inCombat, setInCombat] = useState(false);
  const [fleeDisabled, setFleeDisabled] = useState(false);
  const [showTravelPopup, setShowTravelPopup] = useState(false);
  const [travelText, setTravelText] = useState('Travelling');
  
  const { character, updateLastInn, updateLastGraveyard } = useCharacter(); // Access character stats and updates from context
  const { updateClock } = useClock(); // Access the clock context
  
  const currentRegionData = WorldData[currentRegion];
  const currentAreaData = currentRegionData?.areas[currentArea];
  const currentLocalPositionData = currentAreaData?.localPositions[currentLocalPosition];
  const currentActivityData = currentLocalPositionData?.activities[currentActivity];

  const mainImage = currentActivityData
    ? currentActivityData.image
    : currentLocalPositionData?.image || currentAreaData?.image || currentRegionData?.image;
  const mainTitle = currentActivityData
    ? currentActivityData.name
    : currentLocalPositionData?.name || currentAreaData?.name || currentRegionData?.name;
  const mainDescription = currentActivityData
    ? currentActivityData.description
    : currentLocalPositionData?.description || currentAreaData?.description || currentRegionData?.description;

  const { isPlaying, volume, setVolume, play, pause, fadeIn, fadeOut, setSrc } = useAudio();

  useEffect(() => {
    if (currentLocalPositionData?.enemies && currentLocalPositionData.enemies.length > 0) {
      // Check if an event should be triggered
      const shouldTriggerEvent = Math.random();
      if (shouldTriggerEvent > 0.4) {
        setIsEventActive(true);
      } else {
        setIsEventActive(false);
      }
    } else {
      // Deactivate the event if there are no enemies
      setIsEventActive(false);
    }
  }, [currentLocalPositionData]); // Dependency on currentLocalPositionData

  useEffect(() => {
    const areaMusicMap = {
      darda: './music/darda-theme.mp3',
      theValley: './music/the-valley-theme.mp3',
      graveyard: './music/graveyard-theme.mp3',
      // Add other areas and their corresponding music files here
    };

    const fadeDuration = 1000; // 1 second for fading

    fadeOut(fadeDuration, () => {
      const newSrc = areaMusicMap[currentArea];
      if (newSrc) {
        setSrc(newSrc);
        fadeIn(fadeDuration); // Fade in over 1 second
      } else {
        console.warn(`No audio source found for area: ${currentArea}`);
      }
    });
  }, [currentArea]);

  const handlePopupToggle = (type, list) => {
    if (showPopup && popupType === type) {
      setShowPopup(false);
      setPopupType('');
    } else {
      setPopupList(list);
      setShowPopup(true);
      setPopupType(type);
    }
  };

  const handleTravel = () => {
    const connectedAreaNames = currentAreaData.connectedAreas.map(area => {
      const areaKey = Object.keys(currentRegionData.areas).find(key => key === area.name);
      return currentRegionData.areas[areaKey]?.name;
    });
    handlePopupToggle('travel', connectedAreaNames);
  };

  const handleLocal = () => {
    const localPositionKeys = Object.keys(currentAreaData.localPositions);
    const localPositionNames = localPositionKeys
      .filter(posKey => posKey !== currentLocalPosition) // Filter out the current local position
      .map(posKey => currentAreaData.localPositions[posKey]?.name);
    if (localPositionNames.length === 0) {
      localPositionNames.push("There is nothing else here");
    }
    handlePopupToggle('local', localPositionNames);
  };

  const handleActivities = () => {
    const activityKeys = Object.keys(currentLocalPositionData.activities);
    const activityNames = activityKeys.map(actKey => currentLocalPositionData.activities[actKey]?.name);
    handlePopupToggle('activities', activityNames);
  };

  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, '');

  const handleSelect = async (item) => {
    if (item === "There is nothing else here") {
      setShowPopup(false);
      setPopupType('');
      return;
    }

    setShowPopup(false);
    setPopupType('');
    
    const normalizedItem = normalizeString(item);
    console.log(`Selecting item: ${normalizedItem}`);
    
    const selectedKey = (() => {
      if (popupType === 'activities') {
        return Object.keys(currentLocalPositionData.activities).find(key => {
          const activityName = normalizeString(currentLocalPositionData.activities[key].name);
          console.log(`Checking activity: ${activityName} against ${normalizedItem}`);
          return activityName === normalizedItem;
        });
      } else if (popupType === 'local') {
        return Object.keys(currentAreaData.localPositions).find(key => {
          const localPositionName = normalizeString(currentAreaData.localPositions[key].name);
          console.log(`Checking local position: ${localPositionName} against ${normalizedItem}`);
          return localPositionName === normalizedItem;
        });
      } else {
        return Object.keys(currentRegionData.areas).find(key => {
          const areaName = normalizeString(currentRegionData.areas[key].name);
          console.log(`Checking area: ${areaName} against ${normalizedItem}`);
          return areaName === normalizedItem;
        });
      }
    })();
  
    if (!selectedKey) {
      console.error('Selected key not found');
      return;
    }
  
    if (popupType === 'activities') {
      const selectedActivity = currentLocalPositionData.activities[selectedKey];
      if (selectedActivity.targetArea && selectedActivity.targetLocalPosition) {
        // This is a teleport activity
        handleTeleport(selectedActivity.targetArea, selectedActivity.targetLocalPosition, selectedActivity.travelText);
      } else {
        setTravelText(selectedActivity.travelText || 'Exploring');
        await triggerTravelPopup(() => {
          setCurrentActivity(selectedKey);
        });
      }
    } else if (popupType === 'local') {
      setTravelText(currentAreaData.localPositions[selectedKey].travelText || 'Moving');
      await triggerTravelPopup(() => {
        setCurrentActivity(null);
        setCurrentLocalPosition(selectedKey);
      });
    } else {
      const selectedArea = currentRegionData.areas[selectedKey];
      const connectedArea = currentAreaData.connectedAreas.find(area => normalizeString(currentRegionData.areas[area.name].name) === normalizedItem);
      if (!connectedArea) {
        console.error('Connected area not found');
        return;
      }
      const distance = connectedArea.distance || 0;
      const travelMinutes = distance * 10; // 10 minutes per kilometer
      updateClock(travelMinutes);
      setTravelText(selectedArea.travelText || 'Travelling');
      await triggerTravelPopup(() => {
        setCurrentActivity(null);
        setCurrentLocalPosition(null);
        setCurrentArea(selectedKey);
      });
    }
  };

  const triggerTravelPopup = (callback) => {
    return new Promise((resolve) => {
      setShowTravelPopup(true);
      setTimeout(() => {
        callback();
        setTimeout(() => {
          setShowTravelPopup(false);
          resolve();
        }, 2000); // 2 seconds to fade back in
      }, 2000); // 2 seconds to fade out
    });
  };

  const handleReturnFromActivity = () => {
    const exitText = currentActivityData?.exitText || 'Returning';
    setTravelText(exitText);
    triggerTravelPopup(() => {
      setCurrentActivity(null);
    });
  };

  const handleClickOutsidePopup = (e) => {
    if (
      showPopup &&
      !e.target.closest('.popup') &&
      !e.target.closest('.travel-button') &&
      !e.target.closest('.local-button') &&
      !e.target.closest('.activities-button')
    ) {
      setShowPopup(false);
      setPopupType('');
    }
  };

  const handleTeleport = (targetArea, targetLocalPosition, travelText) => {
    // Set the travel text to the provided travelText or "Teleporting..."
    setTravelText(travelText || 'Teleporting...');

    // Trigger the travel popup and update the state to the new location
    triggerTravelPopup(() => {
      setCurrentActivity(null);
      setCurrentArea(targetArea);
      setCurrentLocalPosition(targetLocalPosition);
    });
  };

  return (
    <div className="app" onClick={handleClickOutsidePopup}>
      <Sidebar
        setCurrentRegion={setCurrentRegion}
        setCurrentArea={setCurrentArea}
        setCurrentLocalPosition={setCurrentLocalPosition}
        setCurrentActivity={setCurrentActivity}
        play={play}
        pause={pause}
        volume={volume}
        setVolume={setVolume}
        isPlaying={isPlaying}
      />
      <ClockDisplay /> {/* Add the ClockDisplay component here */}
      <div className="location-screen">
        <div className="main-image">
          <img src={mainImage} alt={mainTitle} />
        </div>
        <LocationScreen
          region={currentRegionData}
          area={currentAreaData}
          localPosition={currentLocalPositionData}
          activity={currentActivityData}
          handleTravel={handleTravel}
          handleLocal={handleLocal}
          handleActivities={handleActivities}
          setCurrentArea={setCurrentArea}
          setCurrentLocalPosition={setCurrentLocalPosition}
          setCurrentActivity={setCurrentActivity}
          isEventActive={isEventActive}
          inCombat={inCombat} 
          handleReturnFromActivity={handleReturnFromActivity}
          handleTeleport={handleTeleport} // Pass handleTeleport to LocationScreen
        />
      </div>
      {isEventActive && (
        <EventTrigger 
          currentLocalPosition={currentLocalPosition} 
          currentArea={currentArea}
          currentRegion={currentRegion}
          setInCombat={setInCombat} 
          setEnemy={(enemyData) => {
            // Initialize enemy with current and max values
            setEnemy({
              ...enemyData,
              currentHp: enemyData.stats.maxHp,
              currentEn: enemyData.stats.maxEn,
              currentMag: enemyData.stats.maxMag,
            });
          }}
          setIsEventActive={setIsEventActive}
          fleeDisabled={fleeDisabled}
          setFleeDisabled={setFleeDisabled}
        />
      )}
      {inCombat && (
        <CombatWindow 
          currentLocalPosition={currentLocalPosition} 
          currentArea={currentArea}
          currentRegion={currentRegion}
          enemy={enemy} 
          setInCombat={setInCombat} 
          setEnemy={setEnemy} 
          fleeDisabled={fleeDisabled}
          setFleeDisabled={setFleeDisabled}
          setCurrentRegion={setCurrentRegion}
          setCurrentArea={setCurrentArea}
          setCurrentLocalPosition={setCurrentLocalPosition}
          setCurrentActivity={setCurrentActivity}
          triggerTravelPopup={triggerTravelPopup} // Pass the function to CombatWindow
          setTravelText={setTravelText} // Pass setTravelText to CombatWindow
        />
      )}
      {showPopup && (
        <div className="popup">
          <ul>
            {popupList.map(item => (
              <li key={item} onClick={() => handleSelect(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <TravelPopup show={showTravelPopup} text={travelText} />
    </div>
  );
};

export default Game;
