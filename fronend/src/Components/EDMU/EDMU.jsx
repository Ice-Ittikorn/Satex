import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EDMU.css";

export const EDMU = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // ดึงข้อมูลออเดอร์
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/orders");
      const data = await response.json();

      console.log("📌 API ส่งข้อมูล:", data);

      if (!Array.isArray(data)) {
        console.error("❌ API ส่งข้อมูลที่ไม่ใช่อาร์เรย์:", data);
        return;
      }

      const filteredData = data.filter((item) => Number(item.tableid) === 4);
      console.log("📌 ข้อมูลที่ผ่านการกรอง (tableid=4):", filteredData);

      setItems(filteredData);
      setTotalPrice(
        filteredData.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        )
      );
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ฟังก์ชันลบออเดอร์
  const deleteOrder = async (oderid) => {
    if (!oderid) {
      console.error("❌ ไม่สามารถลบได้: oderid เป็น undefined");
      alert("❌ ไม่สามารถลบรายการได้ (ไม่มี oderid)");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/api/orders/${oderid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.oderid !== oderid));
        setTotalPrice((prevTotal) => prevTotal - (items.find(item => item.oderid === oderid)?.price || 0));
        alert("✅ ลบรายการสำเร็จ!");
      } else {
        alert("❌ ไม่สามารถลบรายการได้");
      }
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการลบข้อมูล:", error);
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
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  if (item.oderid) {
                    deleteOrder(item.oderid);
                  } else {
                    console.error("❌ ไม่พบ oderid ของรายการนี้:", item);
                  }
                }}
              >
                ลบ
              </button>
            </div>
          ))
        ) : (
          <p>❌ ไม่มีข้อมูลสำหรับโต๊ะนี้</p>
        )}
      </div>

      <div className="cart-summary">
        <p>ราคารวม {totalPrice} บาท</p>
      </div>
      <button className="order-button" onClick={placeOrder}>
        สั่งอาหาร
      </button>
    </div>
  );
};

export default EDMU;
