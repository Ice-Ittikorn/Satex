import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dolly.css';

const Dolly = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันดึงข้อมูลจาก API
  useEffect(() => {
    axios.get('http://localhost:3002/api/orders') // เปลี่ยน URL ให้ตรงกับ API ของคุณ
      .then((response) => {
        console.log('Response data:', response.data);  // แสดงข้อมูลทั้งหมดที่ได้รับ
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  // ฟังก์ชันจัดกลุ่มออร์เดอร์ตาม tableId
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
      .then((response) => {
        console.log('All orders for table', tableId, 'deleted successfully');
        // หลังจากลบข้อมูลทั้งหมดสำเร็จ, อัพเดต UI โดยลบทุกออร์เดอร์ที่เกี่ยวข้องกับโต๊ะนั้น
        setOrders(orders.filter(order => order.tableid !== tableId));
      })
      .catch((error) => {
        console.error('Error deleting orders for table:', error);
      });
  };

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="dolly-container">
      {/* ตรวจสอบว่า groupedOrders มีข้อมูลแล้วหรือยัง */}
      {Object.keys(groupedOrders).length === 0 ? (
        <div>ไม่พบข้อมูลออร์เดอร์</div>
      ) : (
        Object.keys(groupedOrders).map((tableId) => (
          <div key={tableId} className="dolly-table">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>โต๊ะที่ {tableId}</h2>
              <button 
                onClick={() => deleteAllOrdersForTable(tableId)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                ลบทั้งหมด
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
