import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';  
import './Editemp.css';

export const Editemp = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ รับข้อความแจ้งเตือนจากการแก้ไขข้อมูล
    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            // ลบข้อความหลังจาก 3 วินาที
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    }, [location.state]);

    // ✅ ดึงข้อมูลพนักงานจากฐานข้อมูล
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/employees');
                if (Array.isArray(response.data)) {
                    setEmployees(response.data);
                } else {
                    setErrorMessage('ข้อมูลพนักงานไม่ถูกต้อง');
                }
            } catch (error) {
                setErrorMessage('เกิดข้อผิดพลาดในการดึงข้อมูล');
            }
        };

        fetchEmployees();
    }, []);

    // ✅ ฟังก์ชันกรองข้อมูลพนักงาน
    const filteredEmployees = employees.filter((emp) =>
        Object.values(emp).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // ✅ ฟังก์ชันแก้ไขพนักงาน
    const handleEditClick = (empId) => {
        navigate(`/Edit_emp_gard/${empId}`);
    };

    // ✅ ฟังก์ชันเพิ่มพนักงาน
    const handleAddEmployee = () => {
        navigate('/Add_emp');
    };

    return (
        <div className="employee-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>
            
            {/* ✅ แสดงข้อความแจ้งเตือน */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
            {/* 🔍 Search Box */}
            <div className="search-box">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ค้นหาพนักงาน"
                />
            </div>

            {/* 👥 Employee List */}
            <div className="employee-grid">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                        <div key={emp.empid} className="employee-card">
                            <p><strong>ชื่อ:</strong> {emp.name} {emp.lastname}</p>
                            <div className="employee-info">
                                <p><strong>รหัสพนักงาน:</strong> {emp.empid}</p>
                                <p><strong>เบอร์โทร:</strong> {emp.phone}</p>
                                <p><strong>อีเมล:</strong> {emp.email}</p>
                                <p><strong>ตำแหน่ง:</strong> {emp.job}</p>
                            </div>
                            <button className="edit-button" onClick={() => handleEditClick(emp.empid)}>
                                แก้ไข
                            </button>
                        </div>
                    ))
                ) : (
                    <p>ไม่พบข้อมูลพนักงาน</p>
                )}
            </div>

            {/* ➕ ปุ่มเพิ่มพนักงาน */}
            <button className="add-employee-button" onClick={handleAddEmployee}>
                เพิ่มพนักงาน
            </button>
        </div>
    );
};

export default Editemp;
