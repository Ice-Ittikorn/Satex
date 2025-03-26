import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddEmp from '../../Components/AddEmp/AddEmp';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

export const Add_emp = () => {
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
              <AddEmp />
            </div>
          </div>
        </div>
      );
}
