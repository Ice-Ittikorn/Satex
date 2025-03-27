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
            <h2 className='ti'>Employee Information</h2>
            <form onSubmit={handleSubmit}>
                <div className='t2'>
                    <label htmlFor="name" className='textin'>Name:</label>
                    <input 
                        className="chlonginput"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='t2'>
                    <label htmlFor="lastname" className='textin'>Lastname:</label>
                    <input
                         className="chlonginput"
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='t2'>
                    <label htmlFor="phone" className='textin'>Phone:</label>
                    <input
                         className="chlonginput"
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='t2'>
                    <label htmlFor="email" className='textin'>Email:</label>
                    <input
                         className="chlonginput"
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='t2'>
                    <label htmlFor="gardID" className='textin'>Gard ID:</label>
                    <input
                         className="chlonginput"
                        type="text"
                        id="gardID"
                        name="gardID"
                        value={formData.gardID}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='t2'>
                    <label htmlFor="username" className='textin'>Username:</label>
                    <input
                         className="chlonginput"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='t2'>
                    <label htmlFor="password" className='textin'>Password:</label>
                    <input
                         className="chlonginput"
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='t2'>
                    <label htmlFor="job" className='textin'>Job:</label>
                    <input
                        className="chlonginput"
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
