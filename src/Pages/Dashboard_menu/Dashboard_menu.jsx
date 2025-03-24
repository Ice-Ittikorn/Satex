import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

export const Dashboard_menu = () => {
    return (
        <div>
        <Navbar/>
        <Sidebar/>
        <h1>Dashboard_menu</h1>
      </div>
      )
}

export default Dashboard_menu
