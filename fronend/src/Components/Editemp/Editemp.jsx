import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Editemp.css';

export const Editemp = () => {
    const [employees, setEmployees] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                console.log('กำลังดึงข้อมูลพนักงาน...');
                const response = await axios.get('http://localhost:3002/api/employees');
                console.log('ข้อมูลพนักงานที่ดึงมา:', response.data);
                // ตรวจสอบว่าได้ข้อมูลเป็นอาร์เรย์หรือไม่
                if (Array.isArray(response.data)) {
                    setEmployees(response.data);
                } else {
                    setErrorMessage('ข้อมูลพนักงานไม่ถูกต้อง');
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน:', error);
                setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูล');
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="employee-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>

            {/* แสดงข้อความแสดงข้อผิดพลาด */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="search-box">
                <input type="text" placeholder="ค้นหาพนักงานด้วยรหัส หรือชื่อ" />
            </div>

            {/* ตรวจสอบว่า employees มีข้อมูลหรือไม่ */}
            <div className="employee-grid">
                {employees.length > 0 ? (
                    employees.map((emp) => (
                        <div key={emp.empid} className="employee-card">
                            <img src={emp.image} alt={emp.name} className="employee-image" />
                            <div className="employee-info">
                                <p><strong>รหัสพนักงาน:</strong> Em{emp.empid}</p>
                                <p><strong>ชื่อพนักงาน:</strong> {emp.name} {emp.lastname}</p>
                                <p><strong>เบอร์โทร:</strong> {emp.Phone}</p>
                                <p><strong>อีเมล:</strong> {emp.Email}</p>
                                <p><strong>ตำแหน่ง:</strong> {emp.Job}</p>
                            </div>
                            <button className="edit-button">แก้ไข</button>
                        </div>
                    ))
                ) : (
                    <p>กำลังโหลดข้อมูล...</p>
                )}
            </div>

            <button className="add-employee-button">เพิ่มพนักงาน</button>
        </div>
    );
};

export default Editemp;
