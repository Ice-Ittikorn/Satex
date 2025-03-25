import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

export const Stock = () => {
    return (
        <>
        <div >
          <Navbar/>
          <Sidebar/>
          <Stock/>
        </div>
        </>
      );
}

export default Stock