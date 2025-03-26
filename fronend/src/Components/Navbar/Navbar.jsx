import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { photo } from '../../assets/Images/Images';

const Navbar = () => {
  const [userName, setUserName] = useState('');  // สร้าง state สำหรับชื่อผู้ใช้

  useEffect(() => {
    // ลองดึงข้อมูลชื่อผู้ใช้จาก sessionStorage หรือ localStorage ถ้ามีการล็อกอิน
    const loggedInUser = sessionStorage.getItem('username');
    if (loggedInUser) {
      setUserName(loggedInUser);  // ตั้งค่า userName ถ้ามีข้อมูลผู้ใช้
    }
  }, []);

  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้เมื่อออกจากระบบ
    sessionStorage.removeItem('username');
    setUserName('');
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <img src={photo.LoGo} alt="logo" />
        <div className="navbar__links">
          {userName ? (
            // หากมีชื่อผู้ใช้แล้ว ให้แสดงชื่อผู้ใช้แทน
            <div>
              <span className='username'>{userName}</span>
              <button className='but_logout'onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            // ถ้ายังไม่ได้ล็อกอิน ก็แสดงลิงก์ Login
            <>
              <Link to="/Login">Login</Link>
              <Link to="/Register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
