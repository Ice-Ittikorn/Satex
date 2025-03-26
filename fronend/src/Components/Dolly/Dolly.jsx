import React, { useState } from "react";
import "./Dolly.css";

export const Dolly = () => {
  const [isEditing, setIsEditing] = useState(false); // สถานะสำหรับโหมดแก้ไข
  const [ingredients, setIngredients] = useState([
    "เนื้อปลาดอลลี่ 180 กรัม",
    "เกลือ 1/2 ช้อนชา",
    "พริกไทย 1/2 ช้อนชา",
    "น้ำมันมะกอก 1 ช้อนโต๊ะ",
    "ผักเครื่องเคียง แครอท สลัด 50 กรัม"
  ]);
  const [tempIngredients, setTempIngredients] = useState([...ingredients]); // ค่าชั่วคราวเมื่อแก้ไข
  const [showConfirm, setShowConfirm] = useState(false); // สถานะแสดงข้อความ "แก้ไขสำเร็จ"

  // ฟังก์ชันเมื่อกดปุ่ม "แก้ไข"
  const handleEdit = () => {
    setIsEditing(true);
  };

  // ฟังก์ชันเมื่อมีการเปลี่ยนแปลงค่าของช่อง Input
  const handleChange = (index, value) => {
    const newIngredients = [...tempIngredients];
    newIngredients[index] = value;
    setTempIngredients(newIngredients);
  };

  // ฟังก์ชันเมื่อกดปุ่ม "ยืนยัน"
  const handleSave = () => {
    setIngredients(tempIngredients);
    setIsEditing(false);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 2000); // ข้อความ "แก้ไขสำเร็จ" หายไปเองใน 2 วินาที
  };

  return (
    <div className="container">
      <h2 className="title">ระบบจัดการเมนูอาหาร</h2>

      <div className="content">
        <h3 className="menu-title">สเต็กปลาดอลลี่</h3>
        
        {/* กล่องรูปภาพ */}
        <div className="image-box">
          <img src="https://via.placeholder.com/250" alt="steak" className="image" />
        </div>

        {/* กล่องวัตถุดิบ */}
        <div className="ingredients-box">
          <h4 className="ingredients-title">วัตถุดิบ</h4>
          <ul className="ingredient-list">
            {tempIngredients.map((item, index) => (
              <li key={index}>
                {isEditing ? (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="ingredient-text">• {item}</span> // ไข่ปลาแทนหมายเลขลำดับ
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ปุ่มแก้ไข / ยืนยัน */}
        {isEditing ? (
          <button className="confirm-btn" onClick={handleSave}>ยืนยัน</button>
        ) : (
          <button className="edit-btn" onClick={handleEdit}>แก้ไข</button>
        )}
      </div>

      {/* ข้อความยืนยันการแก้ไข */}
      {showConfirm && <div className="confirm-message">แก้ไขสำเร็จ</div>}
    </div>
  );
};

export default Dolly;
