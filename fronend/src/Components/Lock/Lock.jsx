import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Lock.css';

const Lock = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    try {
      // 🔥 เปลี่ยน endpoint ให้ถูกต้อง `/login`
      const res = await axios.post('http://localhost:3002/login', {
        username,
        password,
      });

      if (res.data.success) {
        alert(res.data.message);
        navigate('/'); // ไปหน้า Home
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className='Login'>
      <div className='logo'>
        <i className="ri-user-fill"></i>
      </div>

      <form onSubmit={handleLogin}>
        <label className='text'>Username</label>
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

        <label className='text'>Password</label>
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
};

export default Lock;
