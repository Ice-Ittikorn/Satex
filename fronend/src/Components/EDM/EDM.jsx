import React from "react";
import './EDM.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
export const EDM = () => {
    const foodItems = [
        { id: 1, img: "c:\Users\Not Sloth\Pictures\Saved Pictures\image0.jpg", name: "Steak" },
        { id: 2, img: "c:\Users\Not Sloth\Pictures\Saved Pictures\image0.jpg", name: "Grilled Fish" },
        { id: 3, img: "c:\Users\Not Sloth\Pictures\Saved Pictures\image0.jpg", name: "BBQ Pork" },
        { id: 4, img: "c:\Users\Not Sloth\Pictures\Saved Pictures\image0.jpg", name: "Salad" },
        { id: 5, img: "c:\Users\Not Sloth\Pictures\Saved Pictures\image0.jpg", name: "Soup" },
    ];

    return (
        <div className="menu-container">
            <h1>🍽️ ระบบจัดการเมนูอาหาร</h1>
            <div className="grid-container">
                {/* แสดงรายการอาหาร */}
                {foodItems.map((item) => (
                    <div key={item.id} className="menu-item">
                        <img src={item.img} alt={item.name} />
                    </div>
                ))}

                {/* เพิ่มช่องว่างตามภาพ */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index + foodItems.length} className="empty-slot"></div>
                ))}
            </div>
        </div>
    );
};

export default EDM;