import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditNemp.css';

export const EditNemp = () => {
    const { empId } = useParams(); // รับ empId จาก URL params
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

    // ✅ ดึงข้อมูลพนักงานจาก API โดยใช้ empId
    useEffect(() => {
        if (!empId) {
            alert('ไม่พบข้อมูลพนักงาน');
            return;
        }

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

    // ✅ ฟังก์ชันยืนยันการแก้ไขข้อมูล
    const handleSubmit = async () => {
        if (!empId) {
            alert('ไม่พบ empId');
            return;
        }

        // ตรวจสอบว่า formData ครบถ้วนหรือไม่
        const missingFields = Object.entries(formData).filter(([key, value]) => !value).map(([key]) => key);
        if (missingFields.length > 0) {
            alert(`กรุณากรอกข้อมูล: ${missingFields.join(', ')}`);
            return;
        }

        try {
            // ✅ ลบ empid ออกจาก formData ก่อนส่ง
            const { empid, ...dataToSend } = formData;

            await axios.put(`http://localhost:3002/api/employees/${empId}`, dataToSend);
            navigate('/Manage_employee', { state: { successMessage: 'ข้อมูลพนักงานถูกอัปเดตสำเร็จ!' } });
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`ไม่สามารถอัปเดตข้อมูลพนักงานได้: ${error.response.data.message}`);
            } else {
                console.error('Error:', error.message);
                alert('ไม่สามารถอัปเดตข้อมูลพนักงานได้');
            }
        }
    };

    return (
        <div className="editnemp-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>
            <div className="edit-box">
                <div className="form-container">
                    {/* ✅ แสดง empid แต่ตั้งค่าเป็น readOnly */}
                    <div className="form-group">
                        <label>รหัสพนักงาน :</label>
                        <input
                            type="text"
                            name="empid"
                            value={formData.empid || ''}
                            readOnly // 👈 ไม่สามารถแก้ไขได้
                        />
                    </div>

                    {/* ✅ แสดงฟิลด์อื่น ๆ (ยกเว้น empid) */}
                    {Object.entries(formData)
                        .filter(([key]) => key !== 'empid')
                        .map(([key, value]) => (
                            <div className="form-group" key={key}>
                                <label>{key} :</label>
                                <input
                                    type={key === 'password' ? 'password' : 'text'}
                                    name={key}
                                    value={value || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                </div>

                {/* ✅ ปุ่มยืนยัน */}
                <button className="confirm-button" onClick={handleSubmit}>
                    ยืนยัน
                </button>
            </div>
        </div>
    );
};

export default EditNemp;
