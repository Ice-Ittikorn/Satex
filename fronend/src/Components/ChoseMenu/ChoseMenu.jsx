import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./Chosemenu.css";

export const Chosemenu = () => {
    const location = useLocation();
    const { item } = location.state || {}; // ดึงเฉพาะ item จาก location.state

    const tableid = "4"; // กำหนดค่า tableid ให้เป็น 4 เสมอ

    const [selectedOption, setSelectedOption] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0); // เปลี่ยนค่าเริ่มต้นเป็น 0

    // ถ้าไม่มี item ให้แสดงข้อความ
    if (!item) {
        return <p>No item selected.</p>;
    }

    // ฟังก์ชันในการเพิ่มหรือลดจำนวน
    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(0, prev + change));
    };

    // ดึงราคาจากฐานข้อมูลตามเมนู ID
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/menu/${item.menuid}`);
                const data = await response.json();

                // ตรวจสอบว่ามีข้อมูลราคาใน response หรือไม่
                if (data && data.price) {
                    setOrderPrice(data.price); // ตั้งค่าราคาเมนูจากฐานข้อมูล
                } else {
                    console.error("ไม่พบข้อมูลราคาเมนู");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู:", error);
            }
        };

        if (item && item.menuid) {
            fetchMenuData();
        }
    }, [item.menuid]);

    // ฟังก์ชันส่งคำสั่งซื้อ
    const handleOrder = async () => {
        if (quantity <= 0) {
            alert("กรุณาเลือกจำนวนอาหารก่อนสั่ง!");
            return;
        }

        const orderData = {
            manu: item.name,
            note: `${additionalNotes} ${selectedOption ? `ระดับความสุก/หวาน: ${selectedOption}` : ''}`,
            tableid: tableid,  // ใช้ค่า tableid ที่กำหนดเป็น 4
            status: "รับออร์เดอร์",
            price: orderPrice,  // ใช้ราคาเมนูจากฐานข้อมูลที่ดึงมา
            quantity: quantity  // จำนวนที่ลูกค้าสั่ง
        };

        try {
            const response = await fetch('http://localhost:3002/api/orders', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error("สั่งอาหารไม่สำเร็จ!");
            }

            alert(`✅ สั่ง ${item.name} จำนวน ${quantity} ชิ้นสำเร็จ!`);
            setQuantity(0);
            setAdditionalNotes("");
            setSelectedOption("");

        } catch (error) {
            alert(`❌ เกิดข้อผิดพลาด: ${error.message}`);
        }
    };

    // ฟังก์ชันในการเลือกระดับความสุกหรือความหวาน
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
            {orderPrice !== 0 && <p className="menu-price">{orderPrice} บาท</p>} {/* แสดงราคา */}

            <div className="section-divider"></div>

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
