import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

export const Payment = () => {
  return (
    <div>
    <Navbar/>
    <Sidebar/>
    <h1>Payment</h1>
  </div>
  )
}

export default Payment