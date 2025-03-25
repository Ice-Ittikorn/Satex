import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import {photo} from '../../assets/Images/Images';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <img src={photo.LoGo} alt="logo" />
        <div className="navbar__links">
          <Link to="/Login">Login</Link>
          <Link to="/Register">Resgiter</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar