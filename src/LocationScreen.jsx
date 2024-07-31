import React from 'react';

const LocationScreen = ({ region, area, localPosition, activity, handleTravel, handleLocal, handleActivities, setCurrentArea, setCurrentLocalPosition, setCurrentActivity, isEventActive }) => {
  return (
    <div className="world-location">
      <h2 className="location-name">{activity ? activity.name : (localPosition?.name || area?.name || region.name)}</h2>
      <p className="location-description">{activity ? activity.description : (localPosition?.description || area?.description || region.description)}</p>
      <div className="button-container">
        {!localPosition && !activity && (
          <>
            <button className="travel-button" onClick={handleTravel}>Travel</button>
            <button className="enter-button" onClick={() => setCurrentLocalPosition(Object.keys(area.localPositions)[0])}>Enter</button>
          </>
        )}
        {localPosition && !activity && (
          <>
            <button className="local-button" onClick={handleLocal} disabled={isEventActive}>Local</button>
            <button className="activities-button" onClick={handleActivities} disabled={isEventActive}>Activities</button>
            <button className="leave-button" onClick={() => { setCurrentLocalPosition(null); setCurrentActivity(null); }} disabled={isEventActive}>Leave Area</button>
          </>
        )}
        {activity && (
          <button className="return-button" onClick={() => setCurrentActivity(null)}>Return</button>
        )}
      </div>
    </div>
  );
};

export default LocationScreen;
