import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Lock.css';

const Lock = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3002/login', {
        username,
        password,
      });

      if (res.data.success) {
        setErrorMessage('');
        sessionStorage.setItem('username', username);
        navigate('/');
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.response?.data?.message || 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <i className="ri-user-fill"></i>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        <label className="text">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          className="input-field" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="text">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password"  
          className="input-field" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* แสดงข้อความแจ้งเตือน */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <button type="submit" className="login-button">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
};

export default Lock;
