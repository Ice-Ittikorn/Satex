import React, { useState } from 'react';
import './Stockedit.css';

export const Stockedit = () => {
    const [expiryDate, setExpiryDate] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    // ฟังก์ชันจัดการการป้อนวันที่
    const handleDateChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // เอาเฉพาะตัวเลข
        if (value.length > 8) return; // จำกัดความยาวไม่เกิน 8 ตัว (DDMMYYYY)

        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = value.substring(0, 2); // วันที่ (DD)
        }
        if (value.length > 2) {
            formattedValue += '/' + value.substring(2, 4); // เดือน (MM)
        }
        if (value.length > 4) {
            formattedValue += '/' + value.substring(4, 8); // ปี (YYYY)
        }

        setExpiryDate(formattedValue);
    };

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
        <div className="stockedit-container">
            {/* หัวข้อและปุ่มอัปเดต */}
            <div className="header">
                <h1 className="stock-title">สินค้าคงคลัง</h1>
            </div>

            {/* กล่องฟอร์มแก้ไขสต็อก */}
            <div className="edit-box">
                {/* อัปโหลดรูปภาพ */}
                <div className="image-upload">
                    {imagePreview ? (
                        <div className="image-wrapper">
                            <img src={imagePreview} alt="สินค้า" className="preview-image" />
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

                {/* ฟอร์มข้อมูลสินค้า */}
                <div className="form-container">
                    <div className="form-group">
                        <label>รหัสสินค้า :</label>
                        <input type="text" disabled />
                    </div>
                    <div className="form-group">
                        <label>ชื่อสินค้า :</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>จำนวน :</label>
                        <input type="number" />
                    </div>
                    <div className="form-group">
                        <label>วันที่หมดอายุ :</label>
                        <input
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={expiryDate}
                            onChange={handleDateChange}
                            maxLength="10"
                        />
                    </div>
                    <div className="form-group">
                        <label>สถานะ :</label>
                        <input type="text" />
                    </div>
                </div>

                {/* ปุ่มยืนยัน */}
                <button className="confirm-button">ยืนยัน</button>
            </div>
        </div>
    );
};

export default Stockedit;
