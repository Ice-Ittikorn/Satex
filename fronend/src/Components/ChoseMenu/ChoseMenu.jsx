import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Chosemenu.css";

export const Chosemenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { item } = location.state || {}; // รับ item จากหน้าอื่น
    const tableid = "4";

    const [selectedOption, setSelectedOption] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [orderPrice, setOrderPrice] = useState(0);

    if (!item) return <p>No item selected.</p>;

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/menu/${item.menuid}`);
                const data = await response.json();
                if (data?.price) {
                    setOrderPrice(data.price);
                } else {
                    console.error("ไม่พบข้อมูลราคาเมนู");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู:", error);
            }
        };

        if (item?.menuid) {
            fetchMenuData();
        }
    }, [item?.menuid]);

    const handleOrder = async () => {
        if (quantity <= 0) {
            alert("กรุณาเลือกจำนวนอาหารก่อนสั่ง!");
            return;
        }

        const orderData = {
            manu: item.name,
            note: `${additionalNotes} ${selectedOption ? `ระดับ: ${selectedOption}` : ''}`,
            tableid,
            status: "รับออร์เดอร์",
            price: orderPrice * quantity, // คำนวณราคารวม
            quantity
        };

        try {
            const response = await fetch('http://localhost:3002/api/orders', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error("สั่งอาหารไม่สำเร็จ!");

            alert(`✅ สั่ง ${item.name} จำนวน ${quantity} ชิ้นสำเร็จ!`);
            navigate('/cart', { state: { refresh: true } }); // ไปยังหน้าตะกร้าและส่งค่า refresh

        } catch (error) {
            alert(`❌ เกิดข้อผิดพลาด: ${error.message}`);
        }
    };

    return (
        <div className="menu-container">
            <img className="menu-image" src={`http://localhost:3002${item.menuimg}`} alt={item.name} />
            <h2 className="menu-title">{item.name}</h2>
            <p className="menu-price">{orderPrice} บาท</p>

            <div className="quantity-section">
                <button className="quantity-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span className="quantity-number">{quantity}</span>
                <button className="quantity-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button className="order-button" onClick={handleOrder}>สั่ง</button>
        </div>
    );
};

export default Chosemenu;
