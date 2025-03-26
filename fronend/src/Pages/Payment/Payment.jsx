import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Payment2 from '../../Components/Payment2/Payment2';

export const Payment = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      {/* Container ที่ครอบ Sidebar และ EDM */}
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {/* Sidebar ต้องอยู่ใน div ที่มี position: relative */}
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          <Payment2/> 
        </div>
      </div>
    </div>
  );
}

export default Payment