import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Notification library
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
        .catch(error => {
          console.error('Error fetching order:', error);
          toast.error('ไม่สามารถดึงข้อมูลออร์เดอร์ได้');
        });
    }
  }, [orderId]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!orderId) {
      toast.error('ไม่พบ orderId');
      return;
    }

    axios.put(`http://localhost:3002/api/orders/${orderId}`, order)
      .then(response => {
        console.log('✅ Order updated successfully:', response.data);
        toast.success('แก้ไขออร์เดอร์สำเร็จ!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        navigate('/Oder');
      })
      .catch(error => {
        console.error('❌ Error updating order:', error);
        toast.error('ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      });
  };

  if (!order) return <div>กำลังโหลดข้อมูลออร์เดอร์...</div>;

  return (
    <div className='brd'>
      <h2>แก้ไขออร์เดอร์</h2>
      <form onSubmit={handleSave} className='order-form'>
        <div className='form-group2'>
          <label className='txlabel'>สินค้า:</label>
          <input 
            type="text" 
            value={order.manu || ''} 
            onChange={(e) => setOrder({ ...order, manu: e.target.value })}
            className='input-field23'
          />
        </div>
        <div className='form-grou2'>
          <label className='txlabel'>บันทึก:</label>
          <input 
            type="text" 
            value={order.note || ''} 
            onChange={(e) => setOrder({ ...order, note: e.target.value })}
            className='input-field23'
          />
        </div>
        <div className='form-group2'>
          <label className='txlabel'>สถานะ:</label>
          <select
            value={order.status || ''}
            onChange={(e) => setOrder({ ...order, status: e.target.value })}
            className='input-field23'
          >
            <option value="รับออร์เดอร์">รับออร์เดอร์</option>
            <option value="กำลังปรุงอาหาร">กำลังปรุงอาหาร</option>
            <option value="เสริฟแล้ว">เสริฟแล้ว</option>
          </select>
        </div>
        <div className='form-group2'>
          <label className='txlabel'>ราคา:</label>
          <input 
            type="number" 
            value={order.price || ''} 
            onChange={(e) => setOrder({ ...order, price: e.target.value })}
            className='input-field234'
          />
        </div>
        <button type="submit" className='save-button'>บันทึกการแก้ไข</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ED;
