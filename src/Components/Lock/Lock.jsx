import React, { useState } from 'react';
import './Lock.css';

const Lock = () => {
  const [username, setUsername] = useState('Cashel');
  const [password, setPassword] = useState('1234');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className='Login'>
      <i className="ri-user-fill"></i>
      <p className='test'>Username</p>
      <input 
        type='text' 
        id='username' 
        name='username' 
        className='input' 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <p className='test'>Password</p>
      <input 
        type='password' 
        id='password' 
        name='password'  
        className='input' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <br/>
      <button className="lb" onClick={handleLogin}>Login</button>
    </div>       
  );
}

export default Lock;
