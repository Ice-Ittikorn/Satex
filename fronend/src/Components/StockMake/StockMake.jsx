import { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      {/* ✅ Name */}
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      {/* ✅ Instore */}
      <div>
        <label>Instore:</label>
        <input value={instore} onChange={(e) => setInstore(e.target.value)} required />
      </div>

      {/* ✅ Unit (เลือกหรือพิมพ์เองได้) */}
      <div>
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

      {/* ✅ Image */}
      <div>
        <label>Image:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      {/* ✅ Submit Button */}
      <button type="submit">
        {storeData?.storeid ? 'Update Store' : 'Add Store'}
      </button>
    </form>
  );
};

export default Stockedit;
