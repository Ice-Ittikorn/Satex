import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Showmenu.css'; // Import the CSS for styling

const Showmenu = () => {
  const [menuData, setMenuData] = useState(null);
  const { menuid } = useParams();  // Get menuid from URL

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
    return <p>กำลังโหลดข้อมูล...</p>;  // Show loading message
  }

  return (
    <div className="menu-show-container">
      <h1>🍽️ รายละเอียดเมนูอาหาร</h1>
      <div className="menu-item-show">
        <h2>{menuData.name}</h2>
        <img 
          src={`http://localhost:3002${menuData.menuimg}`} 
          alt={menuData.name} 
          className="food-image"
          onError={(e) => e.target.src = "/placeholder.jpg"} 
        />
        <div className="menu-info">
          <p><strong>Menu ID:</strong> {menuData.menuid}</p>
          <p><strong>In Kitchen:</strong> {menuData.inkitchen}</p>
          <p><strong>Price:</strong> {menuData.price}</p>
          <p><strong>Details:</strong> {menuData.details}</p>
          <p><strong>Components:</strong> {menuData.component}</p>
          <p><strong>To Do:</strong> {menuData.todo}</p>
          <p><strong>Type:</strong> {menuData.type}</p>
        </div>
      </div>
    </div>
  );
};

export default Showmenu;
