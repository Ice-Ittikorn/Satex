import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Edshowmenu.css';

const Edshowmenu = () => {
  const { menuid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    inkitchen: '',
    price: '',
    details: '',
    component: '',
    todo: '',
    type: ''
  });

  // ดึงข้อมูลเมนูที่ต้องการแก้ไข
  useEffect(() => {
    axios.get(`http://localhost:3002/api/menu/${menuid}`)
      .then((response) => {
        const data = response.data;
        setFormData({
          name: data.name || '',
          inkitchen: data.inkitchen || '',
          price: data.price || '',
          details: data.details || '',
          component: data.component || '',
          todo: data.todo || '',
          type: data.type || ''
        });
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
        toast.error("ไม่สามารถโหลดข้อมูลเมนูได้");
      });
  }, [menuid]);

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงค่าฟอร์ม
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ฟังก์ชันการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = Object.entries(formData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      alert(`กรุณากรอกข้อมูล: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const formDataToSend = {
        name: formData.name,
        inkitchen: formData.inkitchen,
        price: formData.price,
        details: formData.details,
        component: formData.component,
        todo: formData.todo,
        type: formData.type
      };

      await axios.put(`http://localhost:3002/api/menu/${menuid}`, formDataToSend);
      toast.success("เมนูถูกอัปเดตเรียบร้อยแล้ว!");
      navigate('/Edit_menu');
    } catch (error) {
      console.error('Error updating menu:', error);
      toast.error("เกิดข้อผิดพลาดในการอัปเดตเมนู");
    }
  };

  return (
    <div className="edit-menu-container">
      <h2>🍽️ แก้ไขเมนู</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        {/* ชื่อเมนู */}
        <div className="form-group">
          <label htmlFor="name">ชื่อเมนู:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* จำนวนในครัว */}
        <div className="form-group">
          <label htmlFor="inkitchen">จำนวนในครัว:</label>
          <input
            type="text"
            id="inkitchen"
            name="inkitchen"
            value={formData.inkitchen}
            onChange={handleChange}
            required
          />
        </div>

        {/* ราคา */}
        <div className="form-group">
          <label htmlFor="price">ราคา:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* รายละเอียด */}
        <div className="form-group">
          <label htmlFor="details">รายละเอียด:</label>
          <input
            type="text"
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </div>

        {/* ส่วนประกอบ */}
        <div className="form-group">
          <label htmlFor="component">ส่วนประกอบ:</label>
          <input
            type="text"
            id="component"
            name="component"
            value={formData.component}
            onChange={handleChange}
          />
        </div>

        {/* ทำเสร็จ */}
        <div className="form-group">
          <label htmlFor="todo">ทำเสร็จ:</label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={formData.todo}
            onChange={handleChange}
          />
        </div>

        {/* ประเภท */}
        <div className="form-group">
          <label htmlFor="type">ประเภท:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>

        {/* ปุ่มบันทึก */}
        <button type="submit" className="save-button">บันทึก</button>
        <button type="button" className="cancel-button" onClick={() => navigate('/Chosemenu')}>
          ยกเลิก
        </button>
      </form>
    </div>
  );
};

export default Edshowmenu;
