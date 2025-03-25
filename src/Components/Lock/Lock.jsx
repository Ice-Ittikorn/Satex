import React from 'react';
import './Lock.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Lock = () => {
  return (
    <div className='Login'>
      <i class="ri-user-fill"></i>
      <p className='test'>Username</p>
      <input type='text' id='username' name='username' className='input'/>
      <p className='test'>Password</p>
      <input type='text' id='Password' name='Password'  className='input'/>
      <br/>
      <button class="lb">Login</button>
    </div>       
  );
}

export default Lock