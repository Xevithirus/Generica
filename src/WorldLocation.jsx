import React, { useState } from 'react';

const WorldLocation = ({ location, locations, setCurrentLocation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showActivitiesPopup, setShowActivitiesPopup] = useState(false);

  const handleLocationClick = (loc) => {
    setCurrentLocation(loc);
    setShowPopup(false); // Hide the popup after selecting a location
    setShowActivitiesPopup(false); // Hide activities popup after selecting a location
  };

  return (
    <div className="world-location">
      <h2 className="location-name">{location.name}</h2>
      {!showPopup && !showActivitiesPopup && (
        <p className="location-description">{location.description}</p>
      )}
      <div className="button-container">
        <button className="travel-button" onClick={() => setShowPopup(!showPopup)}>
          Travel
        </button>
        <button className="activities-button" onClick={() => setShowActivitiesPopup(!showActivitiesPopup)}>
          Activities
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <ul>
            <h3 className="popup-header">Where would you like to go?</h3>
            {location.nearby.map((loc) => (
              <li key={loc} onClick={() => handleLocationClick(loc)}>
                {locations[loc].name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showActivitiesPopup && (
        <div className="popup">
          <ul>
            <h3 className="popup-header">What would you like to do here?</h3>
            {location.activities.map((activity, index) => (
              <li key={index}>
                {activity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorldLocation;