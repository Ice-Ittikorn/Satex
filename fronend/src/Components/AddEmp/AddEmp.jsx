import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEmp.css';

export const AddEmp = () => {
    const navigate = useNavigate();

    // กำหนด state สำหรับฟอร์มข้อมูลพนักงาน
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        job: '',
    });

    const [error, setError] = useState(''); // สำหรับเก็บข้อความ error

    // ฟังก์ชันสำหรับอัปเดตข้อมูลฟอร์ม
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ฟังก์ชันการยืนยันข้อมูลและส่งข้อมูลไปยัง API
    const handleSubmit = async () => {
        // ตรวจสอบข้อมูลว่าผู้ใช้กรอกครบหรือไม่
        if (!formData.name || !formData.lastname || !formData.phone || !formData.email || !formData.username || !formData.password || !formData.job) {
            setError('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        try {
            console.log(formData);  // ตรวจสอบข้อมูลที่จะส่งไป
            await axios.post('http://localhost:3002/api/employees', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('ข้อมูลพนักงานถูกเพิ่มสำเร็จ');
            // เปลี่ยนเส้นทางไปที่หน้า Manage_employee พร้อมข้อความแจ้งเตือน
            navigate('/Manage_employee', { state: { successMessage: 'ข้อมูลพนักงานถูกเพิ่มสำเร็จ!' } });
        } catch (error) {
            // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์เมื่อเกิดข้อผิดพลาด
            console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูลพนักงาน:', error.response ? error.response.data : error.message);
            // แจ้งเตือนผู้ใช้หากมีข้อผิดพลาดจากเซิร์ฟเวอร์
            alert('ไม่สามารถเพิ่มข้อมูลพนักงานได้: ' + (error.response ? error.response.data.message : error.message));
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
                            />
                        </div>
                    ))}
                </div>
                {error && <div className="error-message">{error}</div>} {/* แสดงข้อความ error ถ้ามี */}
                <button className="confirm-button" onClick={handleSubmit}>
                    ยืนยัน
                </button>
            </div>
        </div>
    );
};

export default AddEmp;
