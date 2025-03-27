import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';  
import { FiEdit, FiTrash2, FiUserPlus } from 'react-icons/fi';
import './Editemp.css';

export const Editemp = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.successMessage) {
            setMessage({ type: 'success', text: location.state.successMessage });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/employees');
                if (Array.isArray(response.data)) {
                    setEmployees(response.data);
                } else {
                    setMessage({ type: 'error', text: 'ข้อมูลพนักงานไม่ถูกต้อง' });
                }
            } catch (error) {
                setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
            }
        };
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter((emp) =>
        Object.values(emp).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleEditClick = (empId) => navigate(`/Edit_emp_gard/${empId}`);
    const handleAddEmployee = () => navigate('/Add_emp');

    const handleDeleteClick = async (empId) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบพนักงานคนนี้?')) {
            try {
                await axios.delete(`http://localhost:3002/api/employees/${empId}`);
                setEmployees(employees.filter(emp => emp.empid !== empId));
                setMessage({ type: 'success', text: 'ลบพนักงานสำเร็จ' });
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } catch (error) {
                setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการลบข้อมูล' });
            }
        }
    };

    return (
        <div className="employee-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>
            {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
            
            <div className="search-box">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="🔍 ค้นหาพนักงาน"
                />
            </div>

            <div className="employee-grid">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                        <div key={emp.empid} className="employee-card">
                            <h3>{emp.name} {emp.lastname}</h3>
                            <div className="employee-info">
                                <p><strong>รหัสพนักงาน:</strong> {emp.empid}</p>
                                <p><strong>เบอร์โทร:</strong> {emp.phone}</p>
                                <p><strong>อีเมล:</strong> {emp.email}</p>
                                <p><strong>ตำแหน่ง:</strong> {emp.job}</p>
                            </div>
                            <div className="employee-actions">
                                <button className="edit-button" onClick={() => handleEditClick(emp.empid)}>
                                    <FiEdit /> แก้ไข
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(emp.empid)}>
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-data">ไม่พบข้อมูลพนักงาน</p>
                )}
            </div>

            <button className="add-employee-button" onClick={handleAddEmployee}>
                <FiUserPlus /> เพิ่มพนักงาน
            </button>
        </div>
    );
};

export default Editemp;
