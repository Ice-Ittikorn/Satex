import React, { useState } from 'react';
import './Editemp.css';

export const Editemp = () => {
    const employees = [
        { id: 1, name: "สมชาย ใจดี", phone: "0812345678", email: "somchai@email.com", address: "กรุงเทพฯ", position: "พนักงานขาย", image: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, name: "มานี สวยงาม", phone: "0823456789", email: "manee@email.com", address: "เชียงใหม่", position: "ฝ่ายบุคคล", image: "https://randomuser.me/api/portraits/women/2.jpg" },
        { id: 3, name: "วีระชัย เก่งกล้า", phone: "0834567890", email: "weerachai@email.com", address: "ภูเก็ต", position: "แผนกไอที", image: "https://randomuser.me/api/portraits/men/3.jpg" },
        { id: 4, name: "สุนิสา น่ารัก", phone: "0845678901", email: "sunisa@email.com", address: "ขอนแก่น", position: "บัญชี", image: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 5, name: "กิตติคุณ ฉลาดล้ำ", phone: "0856789012", email: "kittikhun@email.com", address: "สุราษฎร์ธานี", position: "วิศวกร", image: "https://randomuser.me/api/portraits/men/5.jpg" },
        { id: 6, name: "ปรียานุช สดใส", phone: "0867890123", email: "preeyanuch@email.com", address: "นครราชสีมา", position: "ฝ่ายการตลาด", image: "https://randomuser.me/api/portraits/women/6.jpg" }
    ];

    return (
        <div className="employee-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>
            <div className="search-box">
                <input type="text" placeholder="ค้นหาพนักงานด้วยรหัส หรือชื่อ" />
            </div>

            <div className="employee-grid">
                {employees.map((emp) => (
                    <div key={emp.id} className="employee-card">
                        <img src={emp.image} alt={emp.name} className="employee-image" />
                        <div className="employee-info">
                            <p><strong>รหัสพนักงาน:</strong> Em{emp.id}</p>
                            <p><strong>ชื่อพนักงาน:</strong> {emp.name}</p>
                            <p><strong>เบอร์โทร:</strong> {emp.phone}</p>
                            <p><strong>อีเมล:</strong> {emp.email}</p>
                            <p><strong>ที่อยู่:</strong> {emp.address}</p>
                            <p><strong>ตำแหน่ง:</strong> {emp.position}</p>
                        </div>
                        <button className="edit-button">แก้ไข</button>
                    </div>
                ))}
            </div>

            <button className="add-employee-button">เพิ่มพนักงาน</button>
        </div>
    );
};

export default Editemp;
