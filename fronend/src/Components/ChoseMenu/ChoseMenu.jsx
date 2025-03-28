import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./Chosemenu.css";

export const Chosemenu = () => {
    const location = useLocation();
    const { item } = location.state || {};

    const [selectedOption, setSelectedOption] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [quantity, setQuantity] = useState(0);

    if (!item) {
        return <p>No item selected.</p>;
    }

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(0, prev + change));
    };

    const handleOrder = () => {
        alert(`คุณได้สั่ง ${item.name} จำนวน ${quantity} ชิ้น\n${getOptionLabel()} : ${selectedOption || "ไม่ได้เลือก"}\nหมายเหตุ: ${additionalNotes}`);
    };

    const getOptionLabel = () => {
        if (item.type === "สเต็ก") return "ระดับความสุก";
        if (item.name === "ชาใต้") return "ระดับความหวาน";
        return "";
    };

    const getOptionChoices = () => {
        if (item.type === "สเต็ก") return ["Rare", "Medium", "Well done"];
        if (item.name === "ชาใต้") return ["หวานน้อย", "หวานปกติ", "หวานมาก"];
        return [];
    };

    const options = getOptionChoices();

    return (
        <div className="menu-container">
            <img className="menu-image" src={`http://localhost:3002${item.menuimg}`} alt={item.name} />
            <h2 className="menu-title">{item.name}</h2>
            <p className="menu-price">{item.price} บาท</p>

            <div className="section-divider"></div>

            {/* เงื่อนไขสำหรับแสดงตัวเลือก */}
            {options.length > 0 && (
                <div className="option-section">
                    <p className="section-title">{getOptionLabel()}</p>
                    {options.map((option) => (
                        <label key={option} className="option-label">
                            <input 
                                type="radio" 
                                name="option" 
                                value={option} 
                                checked={selectedOption === option} 
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}

            {/* รายละเอียดเพิ่มเติม */}
            <div className="additional-section">
                <p className="section-title">รายละเอียดเพิ่มเติม</p>
                <textarea 
                    className="additional-input"
                    placeholder="เพิ่ม โน้ตสั่ง"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                ></textarea>
            </div>

            {/* ปุ่มเพิ่ม/ลด จำนวนอาหาร */}
            <div className="quantity-section">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>−</button>
                <span className="quantity-number">{quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            {/* ปุ่มสั่งอาหาร */}
            <button className="order-button" onClick={handleOrder}>สั่ง</button>
        </div>
    );
};

export default Chosemenu;