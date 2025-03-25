import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Lock } from '../../Components/Lock/Lock';

export const Login = () => {
  return (
    <>
    <div className="home">
      <Lock/>
    </div>
    </>
  );
}

export default Login