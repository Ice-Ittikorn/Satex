import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Paymentterminal.css';

const Paymentterminal = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tableId = queryParams.get('table');

  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (tableId) {
      fetch(`http://localhost:3002/api/orders/table/${tableId}`)
        .then(response => response.json())
        .then(data => {
          setOrders(data.orders);
          setTotalPrice(data.orders.reduce((sum, item) => sum + item.price, 0));
        })
        .catch(error => console.error("Error fetching orders:", error));
    }
  }, [tableId]);

  const handlePayment = () => {
    setIsPaid(true);
    setTimeout(() => {
      alert(`โต๊ะ ${tableId} ชำระเงินเรียบร้อยแล้ว`);
      
      // เรียก API เพื่อลบคำสั่งซื้อทั้งหมดสำหรับโต๊ะนั้น
      fetch(`http://localhost:3002/api/orders/table/${tableId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Orders deleted:', data);
        })
        .catch(error => {
          console.error('Error deleting orders:', error);
        });

      setIsPaid(false);
    }, 2000);
  };

  return (
    <div className="payment-terminal">
      <h1>โต๊ะ {tableId}</h1>
      
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <span>{order.name}</span>
              <span>{order.price} บาท</span>
            </div>
          ))
        ) : (
          <p>ไม่มีรายการสั่งซื้อ</p>
        )}
      </div>

      <h2>ราคารวม: {totalPrice} บาท</h2>

      <button 
        className="payment-button"
        onClick={handlePayment}
        disabled={isPaid}
      >
        {isPaid ? "กำลังชำระเงิน..." : "ยืนยันการชำระเงิน"}
      </button>
    </div>
  );
};

export default Paymentterminal;
