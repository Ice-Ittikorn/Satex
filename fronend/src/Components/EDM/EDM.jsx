import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // นำเข้า useNavigate
import './EDM.css';

export const EDM = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();  // กำหนดฟังก์ชันสำหรับนำทาง

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

    const handleMenuItemClick = (menuid) => {
        navigate(`/MenuShow/${menuid}`);  // นำทางไปที่หน้า MenuShow พร้อมกับ menuid
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
                    <div 
                        key={item.menuid} 
                        className="menu-itemedm"
                        onClick={() => handleMenuItemClick(item.menuid)}  // เพิ่ม onClick สำหรับการนำทาง
                    >
                        <p className="menu-name">{item.name}</p>
                        <img 
                            src={`http://localhost:3002${item.menuimg}`} 
                            alt={item.name} 
                            className="food-image"
                            onError={(e) => e.target.src = "/placeholder.jpg"} 
                        />
                        <p className="menu-id"><strong>Menu ID:</strong> {item.menuid}</p>
                        <p className="menu-kitchen"><strong>In Kitchen:</strong> {item.inkitchen}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EDM;
