import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Store from '../../Components/Store/Store';
import Paymentterminal from '../../Components/Paymantterminal/Paymentterminal';

export const PMT = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          <Paymentterminal/> 
        </div>
      </div>
    </div>
  );
}

export default PMT;
