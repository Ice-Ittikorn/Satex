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

    // ดึงข้อมูลพนักงาน
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
                console.error('Error:', error);
                alert('ไม่สามารถดึงข้อมูลพนักงานได้');
            }
        };

        fetchEmployeeData();
    }, [empId]);

    // ฟังก์ชันจัดการการเปลี่ยนแปลงของ input
    const handleInputChange = ({ target: { name, value } }) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // ฟังก์ชันยืนยันการแก้ไข
    const handleSubmit = async () => {
        if (!empId) {
            alert('ไม่พบ empId');
            return;
        }

        const missingFields = Object.entries(formData)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            alert(`กรุณากรอกข้อมูล: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const { empid, ...dataToSend } = formData;
            await axios.put(`http://localhost:3002/api/employees/${empId}`, dataToSend);
            navigate('/Manage_employee', { state: { successMessage: 'ข้อมูลพนักงานถูกอัปเดตสำเร็จ!' } });
        } catch (error) {
            console.error('Error:', error);
            alert('ไม่สามารถอัปเดตข้อมูลพนักงานได้');
        }
    };

    return (
        <div className="editnemp-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>
            <div className="edit-box">
                <div className="form-container">
                    {/* ฟอร์มการกรอกข้อมูล */}
                    <div className="form-group">
                        <label>รหัสพนักงาน</label>
                        <input type="text" name="empid" value={formData.empid || ''} readOnly placeholder=" " />
                    </div>

                    {Object.entries(formData).map(([key, value]) => (
                        key !== 'empid' && (
                            <div className="form-group" key={key}>
                                <label>{key}</label>
                                <input
                                    type={key === 'password' ? 'password' : 'text'}
                                    name={key}
                                    value={value || ''}
                                    onChange={handleInputChange}
                                    placeholder=" "  // เพิ่ม placeholder เพื่อให้ label ลอยขึ้นได้
                                />
                            </div>
                        )
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
