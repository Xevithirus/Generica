// LocationScreen.jsx
import React from 'react';

const LocationScreen = ({ 
  region, 
  area, 
  localPosition, 
  activity, 
  handleTravel, 
  handleLocal, 
  handleActivities, 
  setCurrentArea, 
  setCurrentLocalPosition, 
  setCurrentActivity, 
  isEventActive, 
  inCombat, 
  handleReturnFromActivity,
  handleTeleport // Add the handleTeleport prop
}) => {
  const isDisabled = isEventActive || inCombat;

  const handleResurrect = () => {
    const connectedAreaNames = area.connectedAreas.map(area => {
      const areaKey = Object.keys(region.areas).find(key => key === area.name);
      return region.areas[areaKey]?.name;
    });
    handleTravel(); // Trigger the travel popup with the connected areas
  };

  return (
    <div className="world-location">
      <h2 className="location-name">{activity ? activity.name : (localPosition?.name || area?.name || region.name)}</h2>
      <p className="location-description">{activity ? activity.description : (localPosition?.description || area?.description || region.description)}</p>
      <div className="button-container">
        {!localPosition && !activity && area.name === 'Graveyard' ? (
          <button className="travel-button" onClick={handleResurrect} disabled={isDisabled}>Resurrect</button>
        ) : (
          <>
            {!localPosition && !activity && (
              <>
                <button className="travel-button" onClick={handleTravel} disabled={isDisabled}>Travel</button>
                <button className="enter-button" onClick={() => { setCurrentLocalPosition(Object.keys(area.localPositions)[0]); }} disabled={isDisabled}>Enter</button>
              </>
            )}
            {localPosition && !activity && (
              <>
                <button className="local-button" onClick={handleLocal} disabled={isDisabled}>Local</button>
                <button className="activities-button" onClick={handleActivities} disabled={isDisabled}>Activities</button>
                <button className="leave-button" onClick={() => { setCurrentLocalPosition(null); setCurrentActivity(null); }} disabled={isDisabled}>Leave Area</button>
              </>
            )}
            {activity && (
              <button className="return-button" onClick={handleReturnFromActivity} disabled={isDisabled}>Return</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LocationScreen;
