import React, { useState } from "react";
import "./Dolly.css";

export const Dolly = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [ingredients, setIngredients] = useState([
    "เนื้อปลาดอลลี่ 180 กรัม",
    "เกลือ 1/2 ช้อนชา",
    "พริกไทย 1/2 ช้อนชา",
    "น้ำมันมะกอก 1 ช้อนโต๊ะ",
    "ผักเครื่องเคียง แครอท สลัด 50 กรัม"
  ]);
  const [tempIngredients, setTempIngredients] = useState([...ingredients]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (index, value) => {
    const newIngredients = [...tempIngredients];
    newIngredients[index] = value;
    setTempIngredients(newIngredients);
  };

  const handleSave = () => {
    setIngredients(tempIngredients);
    setIsEditing(false);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 2000);
  };

  return (
    <div className="container">
      <h2 className="title">ระบบจัดการเมนูอาหาร</h2>

      <div className="content">
        <h3 className="menu-title">สเต็กปลาดอลลี่</h3>
        
        {/* รูปภาพอยู่ตรงกลางกับข้อความ */}
        <div className="image-box">
          <img src="https://via.placeholder.com/250" alt="steak" className="image" />
        </div>

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
                  <span className="ingredient-text">• {item}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {isEditing ? (
          <button className="confirm-btn" onClick={handleSave}>ยืนยัน</button>
        ) : (
          <button className="edit-btn" onClick={handleEdit}>แก้ไข</button>
        )}
      </div>

      {showConfirm && <div className="confirm-message">แก้ไขสำเร็จ</div>}
    </div>
  );
};

export default Dolly;
