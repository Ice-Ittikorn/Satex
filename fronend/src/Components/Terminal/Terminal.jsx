import React from 'react';
import './Terminal.css';

export const Terminal = () => {
    const items = [
        { id: 1, name: 'สเต็กเนื้อวัว A5', description: 'สเต็กกระทะร้อนนำเข้า ไม่ใช้สารกันเสีย', price: 349, quantity: 2, unit: 'จาน', image: 'steak.png' },
        { id: 2, name: 'บันบัด', description: '', price: 68, quantity: 1, unit: 'ถ้วย', image: 'bunbud.png' },
        { id: 3, name: 'สเต็กหมู', description: '', price: 179, quantity: 1, unit: 'จาน', image: 'porksteak.png' },
        { id: 4, name: 'โค้ก', description: 'ซอฟท์ดริงก์', price: 25, quantity: 7, unit: 'แก้ว', image: 'coke.png' },
    ];

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="shopping-cart-container">
            <div className="cart-header">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="cart-summary">รวมทั้งหมด {items.length} ชิ้น</p>
            </div>

            <hr />
            <h2 className="section-title">รายการ</h2>
            <div className="items-list">
                {items.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-description">{item.description}</p>
                        </div>
                        <div className="item-price">{item.price} ฿</div>
                        <div className="item-quantity">จำนวน {item.quantity} {item.unit}</div>
                    </div>
                ))}
            </div>
            <hr />
            <div className="total-price">ราคาทั้งหมด {totalAmount} บาท</div>
            <button className="order-button">สั่งอาหาร</button>
        </div>
    );
};

export default Terminal;