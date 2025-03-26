import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditNemp.css';

export const EditNemp = () => {
    const { empId } = useParams(); 
    const navigate = useNavigate();  

    const [formData, setFormData] = useState({
        empid: '',
        name: '',
        lastname: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        job: '',
    });

    useEffect(() => {
        if (!empId) {
            alert('ไม่พบข้อมูลพนักงาน');
            return;
        }

        // ✅ ดึงข้อมูลพนักงานจาก API โดยใช้ empId
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/employees/${empId}`);
                if (response.data) {
                    setFormData(response.data);
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน:', error);
                alert('ไม่สามารถดึงข้อมูลพนักงานได้');
            }
        };

        fetchEmployeeData();
    }, [empId]);

    // ✅ ฟังก์ชันสำหรับอัปเดตข้อมูลฟอร์ม
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ✅ ฟังก์ชันการยืนยันข้อมูล
    const handleSubmit = async () => {
        if (!formData.empid) {
            alert('ข้อมูลพนักงานไม่สมบูรณ์');
            return;
        }
    
        try {
            await axios.put(`http://localhost:3002/api/employees/${formData.empid}`, formData);
            navigate('/Manage_employee', { state: { successMessage: 'ข้อมูลพนักงานถูกอัปเดตสำเร็จ!' } });
        } catch (error) {
            alert('ไม่สามารถอัปเดตข้อมูลพนักงานได้');
        }
    };

    return (
        <div className="editnemp-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>
            <div className="edit-box">
                <div className="form-container">
                    {Object.entries(formData).map(([key, value]) => (
                        <div className="form-group" key={key}>
                            <label>{key} :</label>
                            <input
                                type={key === 'password' ? 'password' : 'text'}
                                name={key}
                                value={value || ''}
                                onChange={handleInputChange}
                                disabled={key === 'empid'}
                            />
                        </div>
                    ))}
                </div>
                <button className="confirm-button" onClick={handleSubmit}>
                    ยืนยัน
                </button>
            </div>
        </div>
    );
};

export default EditNemp;
