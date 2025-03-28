import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Notification library
import 'react-toastify/dist/ReactToastify.css';
import './Dolly.css';

const Dolly = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ดึงข้อมูลจาก API
  useEffect(() => {
    axios.get('http://localhost:3002/api/orders')
      .then((response) => {
        console.log('Response data:', response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
        toast.error('ไม่สามารถดึงข้อมูลออร์เดอร์ได้');
      });
  }, []);

  // จัดกลุ่มออร์เดอร์ตาม tableId
  const groupOrdersByTable = (orders) => {
    return orders.reduce((acc, order) => {
      const { tableid } = order;
      if (!acc[tableid]) {
        acc[tableid] = [];
      }
      acc[tableid].push(order);
      return acc;
    }, {});
  };

  const groupedOrders = groupOrdersByTable(orders);

  // ฟังก์ชันลบออร์เดอร์ทั้งหมดของโต๊ะ
  const deleteAllOrdersForTable = (tableId) => {
    axios.delete(`http://localhost:3002/api/orders/table/${tableId}`)
      .then(() => {
        setOrders(orders.filter(order => order.tableid !== tableId));
        toast.success(`ลบข้อมูลของโต๊ะที่ ${tableId} สำเร็จ!`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.error('Error deleting orders for table:', error);
        toast.error(`ลบข้อมูลของโต๊ะที่ ${tableId} ไม่สำเร็จ`, {
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

  // ฟังก์ชันนำทางไปหน้า Edit_odertable
  const handleEditOrder = (orderId) => {
    navigate(`/Edit_odertable`, { state: { orderId } });
  };

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="dolly-container">
      <ToastContainer /> {/* เพิ่ม ToastContainer เพื่อแสดงข้อความแจ้งเตือน */}
      {Object.keys(groupedOrders).length === 0 ? (
        <div>ไม่พบข้อมูลออร์เดอร์</div>
      ) : (
        Object.keys(groupedOrders).map((tableId) => (
          <div key={tableId} className="dolly-table">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>โต๊ะที่ {tableId}</h2>
              <button 
                onClick={() => deleteAllOrdersForTable(tableId)} className='btntro'
              >
                ลบโต๊ะ
              </button>
            </div>
            <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>สินค้า</th>
                  <th>บันทึก</th>
                  <th>ราคา</th>
                </tr>
              </thead>
              <tbody>
                {groupedOrders[tableId].map((order) => (
                  <tr key={order.oderid}>
                    <td>{order.manu}</td>
                    <td>{order.note}</td>
                    <td>{order.price} บาท</td>
                    <td>
                      <button
                        onClick={() => handleEditOrder(order.oderid)} className='btneed'
                      >
                        แก้ไขเมนู
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Dolly;
