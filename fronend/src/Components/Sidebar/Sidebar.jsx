import React from 'react';
import './Sidebar.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Sidebar = () => {


  return (
    <div className='sidebar'>

      <div className='sidebar_menu'>
        <i className="ri-bit-coin-fill"/>
        <Link to="/Payment" className='text_link'>ระบบชำระเงิน</Link>
      </div>

      <div className='sidebar_menu'>
        <i className="ri-restaurant-fill"/>
        <Link to="/Edit_menu" className='text_link'>ระบบจัดการเมนูอาหาร</Link>
      </div>

      <div className='sidebar_menu'>
        <i className="ri-list-unordered"/>
        <Link to="/Oder" className='text_link'>ระบบจัดการออเดอร์</Link>
      </div>

      <div className='sidebar_menu'>
        <i className="ri-store-fill"/>
        <Link to="/Stock" className='text_link'>ระบบจัดการสต็อก</Link>
      </div>

      <div className='sidebar_menu'>
        <i className="ri-team-fill"/>
        <Link to="/Manage_employee" className='text_link'>ระบบจัดการพนักงาน</Link>
      </div>



    </div>
  );
}

export default Sidebar


