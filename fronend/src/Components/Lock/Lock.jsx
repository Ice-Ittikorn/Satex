import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Lock.css';

const Lock = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // เก็บข้อความแจ้งเตือน
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');  // ปรับข้อความนี้
      return;
    }

    try {
      const res = await axios.post('http://localhost:3002/login', {
        username,
        password,
      });

      if (res.data.success) {
        setErrorMessage(''); // เคลียร์ข้อความเมื่อเข้าสู่ระบบสำเร็จ
        sessionStorage.setItem('username', username); // เซ็ตชื่อผู้ใช้ใน sessionStorage
        navigate('/'); // ไปหน้า Home
      } else {
        setErrorMessage(res.data.message);  // ปรับข้อความที่นี่
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.response?.data?.message || 'เกิดข้อผิดพลาด');  // ปรับข้อความที่นี่
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

        {/* แสดงข้อความแจ้งเตือน */}
        {errorMessage && (
          <div className='error-message'>
            {errorMessage}  {/* ปรับข้อความนี้ */}
          </div>
        )}

        <div className='btn'>
          <button type="submit" className="button">เข้าสู่ระบบ</button> {/* ปรับข้อความปุ่มนี้ */}
        </div>
      </form>
    </div>       
  );
};

export default Lock;
