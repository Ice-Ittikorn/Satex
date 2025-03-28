import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment2.css';

const Payment2= () => {
  const navigate = useNavigate();

  const handleTableClick = (tableId) => {
    navigate(`/PMT?table=${tableId}`);
  };

  return (
    <div className='payment'>
      <h1 className='texh'>ระบบชำระเงิน</h1>
      <div className="payment_content">
        {[...Array(12)].map((_, index) => (
          <button key={index} onClick={() => handleTableClick(index + 1)}>
            โต๊ะ{index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Payment2;
