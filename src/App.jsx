import React, { useState } from 'react';
import Sidebar from './common/Sidebar';
import LocationScreen from './LocationScreen';
import { WorldData } from './WorldData';
import './App.css';

const App = () => {
  const [currentRegion, setCurrentRegion] = useState('faldor');
  const [currentArea, setCurrentArea] = useState('darda');
  const [currentLocalPosition, setCurrentLocalPosition] = useState(null);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupList, setPopupList] = useState([]);
  const [popupType, setPopupType] = useState('');

  const currentRegionData = WorldData[currentRegion];
  const currentAreaData = currentRegionData?.areas[currentArea];
  const currentLocalPositionData = currentAreaData?.localPositions[currentLocalPosition];
  const currentActivityData = currentLocalPositionData?.activities[currentActivity];

  const mainImage = currentActivityData
    ? currentActivityData.image
    : currentLocalPositionData?.image || currentAreaData?.image || currentRegionData.image;
  const mainTitle = currentActivityData
    ? currentActivityData.name
    : currentLocalPositionData?.name || currentAreaData?.name || currentRegionData.name;
  const mainDescription = currentActivityData
    ? currentActivityData.description
    : currentLocalPositionData?.description || currentAreaData?.description || currentRegionData.description;

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
    const connectedAreas = currentAreaData.connectedAreas;
    const connectedAreaNames = connectedAreas.map(areaKey => currentRegionData.areas[areaKey]?.name);
    handlePopupToggle('travel', connectedAreaNames);
  };

  const handleLocal = () => {
    const localPositionKeys = Object.keys(currentAreaData.localPositions);
    const localPositionNames = localPositionKeys.map(posKey => currentAreaData.localPositions[posKey]?.name);
    handlePopupToggle('local', localPositionNames.filter(posName => posName !== currentLocalPosition));
  };

  const handleActivities = () => {
    const activityKeys = Object.keys(currentLocalPositionData.activities);
    const activityNames = activityKeys.map(actKey => currentLocalPositionData.activities[actKey]?.name);
    handlePopupToggle('activities', activityNames);
  };

  const handleSelect = (item) => {
    setShowPopup(false);
    setPopupType('');
    
    const selectedKey = (() => {
      if (popupType === 'activities') {
        return Object.keys(currentLocalPositionData.activities).find(key => currentLocalPositionData.activities[key].name === item);
      } else if (popupType === 'local') {
        return Object.keys(currentAreaData.localPositions).find(key => currentAreaData.localPositions[key].name === item);
      } else {
        return Object.keys(currentRegionData.areas).find(key => currentRegionData.areas[key].name === item);
      }
    })();

    if (popupType === 'activities') {
      setCurrentActivity(selectedKey);
    } else if (popupType === 'local') {
      setCurrentActivity(null);
      setCurrentLocalPosition(selectedKey);
    } else {
      setCurrentActivity(null);
      setCurrentLocalPosition(null);
      setCurrentArea(selectedKey);
    }
  };

  const handleClickOutsidePopup = (e) => {
    if (showPopup && !e.target.closest('.popup') && !e.target.closest('.travel-button') && !e.target.closest('.local-button') && !e.target.closest('.activities-button')) {
      setShowPopup(false);
      setPopupType('');
    }
  };

  return (
    <div className="app" onClick={handleClickOutsidePopup}>
      <Sidebar
        setCurrentRegion={setCurrentRegion}
        setCurrentArea={setCurrentArea}
        setCurrentLocalPosition={setCurrentLocalPosition}
        setCurrentActivity={setCurrentActivity}
      />
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
        />
      </div>
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
    </div>
  );
};

export default App;
