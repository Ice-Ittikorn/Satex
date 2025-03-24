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

      <div className='sidebar_menu'>
        <i class="ri-hotel-line"/>
        <Link to="/Stock" className='text_link'>Stock</Link>
      </div>

      <div className='sidebar_menu'>
        <i class="ri-hotel-line"/>
        <Link to="/Edit_menu" className='text_link'>Edit menu</Link>
      </div>

      <div className='sidebar_menu'>
        <i class="ri-hotel-line"/>
        <Link to="/Dashboard_menu" className='text_link'>Dashboard</Link>
      </div>

      <div className='sidebar_menu'>
        <i class="ri-hotel-line"/>
        <Link to="/Payment" className='text_link'>Payment</Link>
      </div>

      <div className='sidebar_menu'>
        <i class="ri-hotel-line"/>
        <Link to="/Manage_employee" className='text_link'>Manage employee</Link>
      </div>

      <div className='sidebar_menu'>
        <Link to="/" className='text_link_logout'>Logout</Link>
      </div>

    </div>
  );
}

export default Sidebar


