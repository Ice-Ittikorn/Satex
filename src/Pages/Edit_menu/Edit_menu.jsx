import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

export const Edit_menu = () => {
    return (
        <div>
        <Navbar/>
        <Sidebar/>
        <h1>Edit_menu</h1>
      </div>
      )
}

export default Edit_menu
