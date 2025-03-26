import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

export const Manage_employee = () => {
    return (
        <>
        <div >
          <Navbar/>
          <Sidebar/>
        </div>
        </>
      );
}

export default Manage_employee


