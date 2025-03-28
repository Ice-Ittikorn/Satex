import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EDMU.css';

export const EDMU = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/orders');
      const data = await response.json();
  
      console.log("📌 API ส่งข้อมูล:", data);
  
      if (!Array.isArray(data)) {
        console.error("❌ API ส่งข้อมูลที่ไม่ใช่อาร์เรย์:", data);
        return;
      }
  
      const filteredData = data.filter(item => Number(item.tableid) === 4);
      console.log("📌 ข้อมูลที่ผ่านการกรอง (tableid=4):", filteredData);
  
      setItems(filteredData);
      setTotalPrice(filteredData.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0));
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const removeItem = async (oderid) => {
    console.log("🔴 กำลังลบ Order ID:", oderid);

    if (!oderid) {
      console.error("❌ oderid ไม่ถูกต้อง!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/api/orders/${oderid}`, { method: 'DELETE' });
      const responseData = await response.text(); 
      console.log("🔍 API Response:", response.status, responseData);

      if (response.status === 404) {
        alert(`❌ ไม่พบ Order ID: ${oderid}`);
        return;
      }

      if (!response.ok) {
        throw new Error(`ลบไม่สำเร็จ: ${response.status} - ${responseData}`);
      }

      setItems(prevItems => {
        const newItems = prevItems.filter(item => item.oderid !== oderid);
        setTotalPrice(newItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0));
        return newItems;
      });

      console.log(`✅ ลบ Order ID: ${oderid} สำเร็จ!`);

    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการลบออร์เดอร์:", error);
      alert(`❌ ลบไม่สำเร็จ: ${error.message}`);
    }
  };

  const placeOrder = () => {
    alert("✅ สั่งอาหารสำเร็จแล้ว!");
  };

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      <p className="item-count">รวมทั้งหมด {items.length} ชิ้น</p>
      <div className="cart-items">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={item.oderid || `temp-${index}`} className="cart-item"> 
              <div className="item-details">
                <h2>{item.manu}</h2>
                <p>{item.note}</p>
                <p>{item.price} ฿</p>
                <p>จำนวน {item.quantity || 1}</p>
                <button 
                  className="remove-button" 
                  onClick={() => removeItem(item.oderid)}
                  disabled={!item.oderid} 
                >
                  ลบ
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>❌ ไม่มีข้อมูลสำหรับโต๊ะนี้</p>
        )}
      </div>

      <div className="cart-summary">
        <p>ราคารวม {totalPrice} บาท</p>
      </div>
      <button className="order-button" onClick={placeOrder}>สั่งอาหาร</button>
    </div>
  );
};

export default EDMU;