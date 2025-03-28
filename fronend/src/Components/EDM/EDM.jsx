import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";  // นำเข้า toast และ ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // นำเข้า CSS ของ react-toastify
import './EDM.css';

export const EDM = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3002/api/menu')
      .then((response) => {
        const filteredData = response.data.map(item => ({
          menuid: item.menuid,
          name: item.name,
          inkitchen: item.inkitchen,
          menuimg: item.menuimg
        }));
        setFoodItems(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  const filteredFoodItems = foodItems.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.menuid.toString().includes(searchTermLower) ||
      item.name.toLowerCase().includes(searchTermLower) ||
      item.inkitchen.toLowerCase().includes(searchTermLower)
    );
  });

  const handleDeleteClick = (menuid) => {
    console.log('Deleting menu with ID:', menuid);  // Log the menuid
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบเมนูนี้?")) {
      axios.delete(`http://localhost:3002/api/menu/${menuid}`)
        .then(() => {
          setFoodItems(foodItems.filter(item => item.menuid !== menuid)); // Remove deleted item from state
          toast.success("เมนูถูกลบเรียบร้อยแล้ว!");  // ใช้ toast เพื่อแสดงข้อความแจ้งเตือน
        })
        .catch((error) => {
          console.error('Error deleting menu item:', error);
          toast.error("เกิดข้อผิดพลาดในการลบเมนู");  // ใช้ toast เพื่อแสดงข้อความแจ้งเตือนในกรณีที่เกิดข้อผิดพลาด
        });
    }
  };

  return (
    <div className="menu-container">
      <h1>🍽️ ระบบจัดการเมนูอาหาร</h1>
      <div className="search-box2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ค้นหาสินค้าด้วยรหัส, ชื่อ หรือจำนวนคงเหลือ"
        />
      </div>

      <div className="grid-container">
        {filteredFoodItems.map((item) => (
          <div key={item.menuid} className="menu-itemedm">
            <p className="menu-name">{item.name}</p>
            <img 
              src={`http://localhost:3002${item.menuimg}`} 
              alt={item.name} 
              className="food-image"
              onError={(e) => e.target.src = "/placeholder.jpg"} 
            />
            <p className="menu-id"><strong>Menu ID:</strong> {item.menuid}</p>
            <p className="menu-kitchen"><strong>In Kitchen:</strong> {item.inkitchen}</p>
            {/* ปุ่มลบในช่องเดียวกัน */}
            <button onClick={() => handleDeleteClick(item.menuid)} className="delete-button">ลบ</button>
          </div>
        ))}
      </div>

      {/* Toast container สำหรับการแสดงข้อความแจ้งเตือน */}
      <ToastContainer />
    </div>
  );
};

export default EDM;
