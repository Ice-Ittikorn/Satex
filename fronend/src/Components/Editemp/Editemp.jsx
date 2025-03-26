import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Editemp.css';

export const Editemp = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                console.log('กำลังดึงข้อมูลพนักงาน...');
                const response = await axios.get('http://localhost:3002/api/employees');
                console.log('ข้อมูลพนักงานที่ดึงมา:', response.data);
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

    // ✅ กรองทุกฟิลด์ของพนักงาน
    const filteredEmployees = employees.filter((emp) =>
        Object.values(emp).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="employee-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
            {/* Search Box */}
            <div className="search-box">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // อัปเดตค่าใน state
                    placeholder="ค้นหาพนักงาน"
                />
            </div>

            {/* Employee List */}
            <div className="employee-grid">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                        <div key={emp.empid} className="employee-card">
                            <div className="image-container">
                                <img src={emp.image} alt={emp.name} className="employee-image" />
                            </div>
                            <div className="employee-info">
                                <p><strong>รหัสพนักงาน:</strong> {emp.empid}</p>
                                <p><strong>ชื่อพนักงาน:</strong> {emp.name} {emp.lastname}</p>
                                <p><strong>เบอร์โทร:</strong> {emp.Phone}</p>
                                <p><strong>อีเมล:</strong> {emp.Email}</p>
                                <p><strong>ตำแหน่ง:</strong> {emp.Job}</p>
                            </div>
                            <button className="edit-button">แก้ไข</button>
                        </div>
                    ))
                ) : (
                    <p>ไม่พบข้อมูลพนักงาน</p>
                )}
            </div>

            <button className="add-employee-button">เพิ่มพนักงาน</button>
        </div>
    );
};

export default Editemp;
