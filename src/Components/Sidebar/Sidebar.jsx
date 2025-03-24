import React from 'react';
import './Sidebar.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>

      <div className='sidebar_menu'>
        <i class="ri-hotel-line"/>
        <Link to="/Login" className='text_link'>Login</Link>
      </div>

      

    </div>
  );
}

export default Sidebar


