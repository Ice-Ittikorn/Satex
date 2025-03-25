import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';


export const Oder = () => {
    return (
        <>
        <div >
          <Navbar/>
          <Sidebar/>
          <h1>Manage_employee</h1>
        </div>
        </>
      );
}
