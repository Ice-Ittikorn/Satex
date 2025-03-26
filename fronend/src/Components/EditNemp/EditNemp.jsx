import React, { useState } from 'react';
import './EditNemp.css';

export const EditNemp = () => {
    const [imagePreview, setImagePreview] = useState(null);

    // ฟังก์ชันอัปโหลดรูปภาพ
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // ฟังก์ชันลบรูปภาพ
    const handleImageRemove = () => {
        setImagePreview(null);
    };

    return (
        <div className="editnemp-container">
            <h1 className="title">ระบบจัดการพนักงาน</h1>
            <div className="edit-box">
                {/* อัปโหลดรูปภาพ */}
                <div className="image-upload">
                    {imagePreview ? (
                        <div className="image-wrapper">
                            <img src={imagePreview} alt="พนักงาน" className="preview-image" />
                            <button className="remove-image-button" onClick={handleImageRemove}>
                                ✖
                            </button>
                        </div>
                    ) : (
                        <label className="image-placeholder">
                            เพิ่มรูปภาพ
                            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        </label>
                    )}
                </div>

                {/* ฟอร์มกรอกข้อมูล */}
                <div className="form-container">
                    {['รหัสพนักงาน', 'ชื่อพนักงาน', 'เบอร์โทร', 'อีเมล์', 'เลขประจำตัวประชาชน', 'ตำแหน่ง', 'ที่อยู่'].map((label, index) => (
                        <div className="form-group" key={index}>
                            <label>{label} :</label>
                            <input type="text" />
                        </div>
                    ))}
                </div>

                {/* ปุ่มยืนยัน */}
                <button className="confirm-button">ยืนยัน</button>
            </div>
        </div>
    );
};

export default EditNemp;
