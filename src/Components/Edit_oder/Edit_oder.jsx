import React, { useState } from 'react';
import './Edit_oder.css';

export const Edit_oder = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className='oderbar'>
      <label className='edit_oder'>จัดการออเดอร์ :</label>
      <button 
        className={`button_edit_oder_all ${selectedButton === 'all' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('all')}
      >
        ออเดอร์ทั้งหมด
      </button>
      <button 
        className={`button_edit_oder_cancel ${selectedButton === 'cancel' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('cancel')}
      >
        ออเดอร์ที่ยกเลิก
      </button>
      <button 
        className={`button_edit_oder_succeed ${selectedButton === 'succeed' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('succeed')}
      >
        ออเดอร์ที่สำเร็จ
      </button>
    </div>
  );
}

export default Edit_oder;
