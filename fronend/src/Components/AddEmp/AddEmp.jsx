import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEmp.css';

export const AddEmp = () => {
    const navigate = useNavigate();

    // สร้าง state สำหรับจัดเก็บข้อมูลฟอร์ม
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        gardID: '',
        username: '',
        password: '',
        job: '',
    });

    // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSubmit = async (event) => {
        event.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้า

        try {
            // ส่งข้อมูลไปยัง API
            await axios.post('http://localhost:3002/api/employees', formData);
            // เมื่อสำเร็จ ไปที่หน้ารายการพนักงาน
            navigate('/Manage_employee', { state: { successMessage: 'เพิ่มพนักงานสำเร็จ!' } });
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
            alert('ไม่สามารถเพิ่มพนักงานได้');
        }
    };

    return (
        <div className="form-container">
            <h2>Employee Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gardID">Gard ID:</label>
                    <input
                        type="text"
                        id="gardID"
                        name="gardID"
                        value={formData.gardID}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="job">Job:</label>
                    <input
                        type="text"
                        id="job"
                        name="job"
                        value={formData.job}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default AddEmp;
