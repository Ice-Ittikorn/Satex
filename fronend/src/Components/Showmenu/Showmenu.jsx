import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Showmenu.css'; // Import CSS for styling

const Showmenu = () => {
  const [menuData, setMenuData] = useState(null);
  const { menuid } = useParams(); // Get menuid from URL

  useEffect(() => {
    // Fetch menu data using menuid from the URL
    axios.get(`http://localhost:3002/api/menu/${menuid}`)
      .then(response => {
        setMenuData(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, [menuid]);

  if (!menuData) {
    return <p className="loading-text3">กำลังโหลดข้อมูล...</p>; // Show loading message
  }

  return (
    <div className="menu-show-container3">
      <h1>🍽️ รายละเอียดเมนูอาหาร</h1>
      <div className="menu-item-show3">
        <h2>{menuData.name}</h2>
        <img 
          src={`http://localhost:3002${menuData.menuimg}`} 
          alt={menuData.name} 
          className="food-image3"
          onError={(e) => e.target.src = "/placeholder.jpg"} 
        />
        <div className="menu-info3">
          {/* Menu ID กับ In Kitchen */}
          <div className="menu-row3">
            <p className='mag3'><strong>Menu ID:</strong> {menuData.menuid}</p>
            <p className='mag3'><strong>In Kitchen:</strong> {menuData.inkitchen}</p>
          </div>
          
          {/* Price กับ Type */}
          <div className="menu-row3">
            <p><strong>Price:</strong> {menuData.price} บาท</p>
            <p><strong>Type:</strong> {menuData.type}</p>
          </div>

          {/* รายละเอียดเพิ่มเติม */}
          <p><strong>Details:</strong> {menuData.details}</p>
          <p><strong>Menu components:</strong> {menuData.component}</p>
          <p><strong>How to cook:</strong> {menuData.todo}</p>
        </div>
      </div>
    </div>
  );
};

export default Showmenu;
