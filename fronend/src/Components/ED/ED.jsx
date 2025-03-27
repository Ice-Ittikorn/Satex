import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Notification library
import 'react-toastify/dist/ReactToastify.css';
import './ED.css';

const ED = () => {
  const { state } = useLocation();
  const { orderId } = state || {};
  const navigate = useNavigate();  // Hook for navigation

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      axios.get(`http://localhost:3002/api/orders/${orderId}`)
        .then(response => setOrder(response.data))
        .catch(error => console.error('Error fetching order:', error));
    }
  }, [orderId]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!orderId) {
      console.error('❌ No orderId found');
      return;
    }

    axios.put(`http://localhost:3002/api/orders/${orderId}`, order)
      .then(response => {
        console.log('✅ Order updated successfully:', response.data);
        // Show success toast
        toast.success('แก้ไขออร์เดอร์สำเร็จ!');
        // Navigate to the /Oder page after successful update
        navigate('/Oder');
      })
      .catch(error => console.error('❌ Error updating order:', error));
  };

  if (!order) return <div>กำลังโหลดข้อมูลออร์เดอร์...</div>;

  return (
    <div className='brd'>
      <h2>แก้ไขออร์เดอร์</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>สินค้า:</label>
          <input 
            type="text" 
            value={order.manu || ''} 
            onChange={(e) => setOrder({ ...order, manu: e.target.value })}
          />
        </div>
        <div>
          <label>บันทึก:</label>
          <input 
            type="text" 
            value={order.note || ''} 
            onChange={(e) => setOrder({ ...order, note: e.target.value })}
          />
        </div>
        <div>
          <label>สถานะ:</label>
          <input 
            type="text" 
            value={order.status || ''} 
            onChange={(e) => setOrder({ ...order, status: e.target.value })}
          />
        </div>
        <div>
          <label>ราคา:</label>
          <input 
            type="number" 
            value={order.price || ''} 
            onChange={(e) => setOrder({ ...order, price: e.target.value })}
          />
        </div>
        <button type="submit">บันทึกการแก้ไข</button>
      </form>
    </div>
  );
};

export default ED;
