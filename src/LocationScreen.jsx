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
  handleReturnFromActivity 
}) => {
  const isDisabled = isEventActive || inCombat;

  const localPositions = Object.keys(area.localPositions).filter(
    (posKey) => posKey !== localPosition
  );

  return (
    <div className="world-location">
      <h2 className="location-name">{activity ? activity.name : (localPosition?.name || area?.name || region.name)}</h2>
      <p className="location-description">{activity ? activity.description : (localPosition?.description || area?.description || region.description)}</p>
      <div className="button-container">
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
      </div>
    </div>
  );
};

export default LocationScreen;
