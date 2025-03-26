import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Home = () => {
  return (
    <>
    <div className="home">
      <Navbar/>
      <Sidebar/>
    </div>
    </>
  );
}

export default Home