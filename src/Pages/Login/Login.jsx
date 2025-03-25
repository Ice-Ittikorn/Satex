import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import  Lock  from '../../Components/Lock/Lock';
import Navbar  from '../../Components/Navbar/Navbar';
export const Login = () => {
  return (
    <>
    <div className="home">
      <Navbar/>
      <Lock/>
    </div>
    </>
  );
}

export default Login