import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // import useNavigate
import './Stockedit.css';

const Stockedit = ({ storeData }) => {
  const [name, setName] = useState(storeData?.name || '');
  const [count, setCount] = useState(storeData?.count || '');  // ใช้ count แทน instore
  const [unit, setUnit] = useState(storeData?.unit || '');
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  // ✅ ตัวเลือกของหน่วย
  const unitOptions = [
    'กิโลกรัม',
    'กรัม',
    'ลิตร',
    'มิลลิลิตร',
    'ขวด',
    'ถุง',
    'ลูก',
    'เม็ด',
    'ใบ',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบค่าจำนวนคงเหลือ (count) ถ้าเป็นข้อความที่สามารถแปลงเป็นตัวเลขได้
    const countValue = count.trim();
    if (countValue === '' || isNaN(Number(countValue)) || Number(countValue) <= 0) {
      alert("กรุณากรอกจำนวนคงเหลือของสินค้าให้ถูกต้อง");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('count', countValue);  // ส่ง count เป็นข้อความ
      formData.append('unit', unit);
      if (file) formData.append('image', file);

      if (storeData?.storeid) {
        // Update existing store
        await axios.put(`http://localhost:3002/api/stores/${storeData.storeid}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Add new store
        await axios.post('http://localhost:3002/api/stores', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // After successful operation, navigate to the /Stock page with success message
      navigate('/Stock', { state: { successMessage: 'เพิ่มวัตถุดิบสำเร็จ' } });
    } catch (error) {
      console.error('There was an error saving the product:', error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="editnemp-container">
      <h2 className="title">
        {storeData?.storeid ? 'Update Store' : 'Add New Store'}
      </h2>

      <form onSubmit={handleSubmit} className="edit-box">
        <p className='vut'>กรอกข้อมูลวัตถุดิบ</p>
        {/* ✅ Name */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* ✅ Count (จำนวนคงเหลือ) */}
        <div className="form-group">
          <label>Count (จำนวนคงเหลือ):</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
          />
        </div>

        {/* ✅ Unit */}
        <div className="form-group">
          <label>Unit:</label>
          <input
            list="unit-options"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />
          <datalist id="unit-options">
            {unitOptions.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </div>

        {/* ✅ Image Upload */}
        <div className="image-upload">
          <div className="image-placeholder" onClick={() => document.getElementById('image-input').click()}>
            {file ? (
              <div className="image-wrapper">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            ) : (
              'Click to upload an image'
            )}
          </div>
          <input
            type="file"
            id="image-input"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* ✅ Submit Button */}
        <button type="submit" className="confirm-button">
          {storeData?.storeid ? 'Update Store' : 'Add Store'}
        </button>
      </form>
    </div>
  );
};

export default Stockedit;
