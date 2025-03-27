import { useState } from 'react';
import axios from 'axios';
import './Stockedit.css';

const Stockedit = ({ storeData }) => {
  const [name, setName] = useState(storeData?.name || '');
  const [instore, setInstore] = useState(storeData?.instore || '');
  const [unit, setUnit] = useState(storeData?.unit || '');
  const [file, setFile] = useState(null);

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

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('instore', instore);
      formData.append('unit', unit);
      if (file) formData.append('image', file);

      if (storeData?.storeid) {
        await axios.put(`http://localhost:3002/api/stores/${storeData.storeid}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Store updated successfully');
      } else {
        await axios.post('http://localhost:3002/api/stores', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Store added successfully');
      }
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

        {/* ✅ Instore */}
        <div className="form-group">
          <label>Instore:</label>
          <input
            type="number"
            value={instore}
            onChange={(e) => setInstore(e.target.value)}
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
