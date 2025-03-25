import React, { useState } from 'react';
import './Lock.css';

const Lock = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า
    if (!username || !password) {
      alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className='Login'>
      <div className='logo'>
        <i className="ri-user-fill"></i>
      </div>

      <form onSubmit={handleLogin}>
        <label className='text'>ชื่อผู้ใช้</label>
        <br/>
        <input 
          type='text' 
          id='username' 
          name='username' 
          className='input' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>

        <label className='text'>รหัสผ่าน</label>
        <br/>
        <input 
          type='password' 
          id='password' 
          name='password'  
          className='input' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <div className='btn'>
        <button type="submit" className="button">เข้าสู่ระบบ</button>
        </div>
      </form>
      
    </div>       
  );
}

export default Lock;
