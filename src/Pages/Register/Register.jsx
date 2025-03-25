import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Regis from '../../Components/Regis/Regis';
import Navbar from '../../Components/Navbar/Navbar';

export const Register = () => {
    return (
        <>
        <div className="home">
          <Navbar/>
          <Regis/>
        </div>
        </>
      );
}

export default Register