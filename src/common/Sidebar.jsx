import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">CHARACTER</h1>
      <img src="../images/adventurer-female.png" alt="Profile Picture" />
      <p>{`LV: 1`}</p>
      <p>{`XP: 120/1000`}</p>
      <br />
      <p>{`HP: 100`}</p>
      <p>{`ENG: 120`}</p>
      <p>{`MAG: 18`}</p>
      <div className="inventory">
        <h3>Inventory</h3>
        <div className="text-box">
          <ul>
            <li>{`[1] Items`}</li>
            <li>{`[2] To`}</li>
            <li>{`[3] Be`}</li>
            <li>{`[4] Put`}</li>
            <li>{`[5] Here`}</li>
          </ul>
        </div>
        <div className="money-container">
          <p>GOLD: 16g</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
