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

    const handleOrder = async () => {
        if (quantity === 0) {
            alert("กรุณาเลือกจำนวนก่อนสั่งซื้อ!");
            return;
        }

        const orderNote = selectedOption ? `${getOptionLabel()}: ${selectedOption}\n${additionalNotes}` : additionalNotes;

        const newItem = {
            tableid: 4,
            manu: item.name,
            price: item.price,
            quantity: quantity,
            note: orderNote,
            status: "รับออร์เดอร์",
        };

        try {
            const response = await fetch("http://localhost:3002/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                alert(`✅ เพิ่ม ${item.name} ลงในตะกร้าแล้ว!`);
            } else {
                alert("❌ ไม่สามารถเพิ่มสินค้าได้");
            }
        } catch (error) {
            console.error("❌ เกิดข้อผิดพลาด:", error);
        }
    };

    return (
        <div className="menu-container">
            <img className="menu-image" src={`http://localhost:3002${item.menuimg}`} alt={item.name} />
            <h2 className="menu-title">{item.name}</h2>
            <p className="menu-price">{item.price} บาท</p>

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

            <div className="additional-section">
                <p className="section-title">รายละเอียดเพิ่มเติม</p>
                <textarea 
                    className="additional-input"
                    placeholder="เพิ่ม โน้ตสั่ง"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                ></textarea>
            </div>

            <div className="quantity-section">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>−</button>
                <span className="quantity-number">{quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <button className="order-button" onClick={handleOrder}>สั่ง</button>
        </div>
    );
};

export default Chosemenu;