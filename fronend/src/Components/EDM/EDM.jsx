import React, { useEffect, useState } from "react";
import axios from "axios";
import './EDM.css';

export const EDM = () => {
    const [foodItems, setFoodItems] = useState([]);

    // ดึงข้อมูลจากฐานข้อมูล (menuid, name, inkitchen, menuimg)
    useEffect(() => {
        axios.get('http://localhost:3002/api/menu')
            .then((response) => {
                // เลือกเฉพาะ menuid, name, inkitchen, menuimg
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

    return (
        <div className="menu-container">
            <h1>🍽️ ระบบจัดการเมนูอาหาร</h1>
            <div className="grid-container">
                {foodItems.map((item) => (
                    <div key={item.menuid} className="menu-itemedm">
                        <img 
                            src={`http://localhost:3002${item.menuimg}`} 
                            alt={item.name} 
                            className="food-image"
                            onError={(e) => e.target.src = "/placeholder.jpg"}
                        />
                        <p><strong>ID:</strong> {item.menuid}</p>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>In Kitchen:</strong> {item.inkitchen}</p>
                    </div>
                ))}

                {/* เพิ่มช่องว่างให้ grid เต็ม */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index + foodItems.length} className="empty-slot"></div>
                ))}
            </div>
        </div>
    );
};

export default EDM;
