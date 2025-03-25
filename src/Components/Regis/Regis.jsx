import React from 'react';
import './Regis.css';

export const Regis = () => {
  return (
    <div className="container">
      <div className="form-box">
        <div className="input-group">
          <label className="ur">Username:</label>
          <input type="text" id="username" name="username" className="in" />
        </div>
        <div className="input-group">
          <label className="ur">Password:</label>
          <input type="password" id="password" name="password" className="in" />
        </div>
        <div className="input-group">
          <label className="ur">Name:</label>
          <input type="text" id="name" name="name" className="in" />
        </div>
        <div className="input-group">
          <label className="ur">Email:</label>
          <input type="email" id="email" name="email" className="in" />
        </div>
        <div className="input-group">
          <label className="ur">Phonenumber:</label>
          <input type="tel" id="phone" name="phone" className="in" />
        </div>
        <div className="input-group">
          <label className="ur">National ID:</label>
          <input type="text" id="nid" name="nid" className="in" />
        </div>

        {/* ปุ่ม Apply ด้านล่าง */}
        <button className="apply-btn">Apply</button>
      </div>
    </div>
  );
};

export default Regis;
