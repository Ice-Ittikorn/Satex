import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Edshowmenu.css';

const Edshowmenu4 = () => {
  const { menuid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    inkitchen: '',
    price: '',
    details: '',
    component: '',
    todo: '',
    type: '' // ค่าเริ่มต้นของประเภทเป็นค่าว่าง
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
          type: data.type || '' // กำหนดค่าประเภทตามข้อมูลที่ดึงมา
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
    <div className="edit-menu-container4">
      <h2 className='h24'>🍽️ แก้ไขเมนู</h2>
      <form onSubmit={handleSubmit} className="edit-form4">
        {/* ชื่อเมนู */}
        <div className="form-group4">
          <label htmlFor="name">ชื่อเมนู:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className='inp4'
          />
        </div>

        {/* จำนวนในครัว */}
        <div className="form-group4">
          <label htmlFor="inkitchen">จำนวนในครัว:</label>
          <input
            type="text"
            id="inkitchen"
            name="inkitchen"
            value={formData.inkitchen}
            onChange={handleChange}
            required
            className='inp4'
          />
        </div>

        {/* ราคา */}
        <div className="form-group4">
          <label htmlFor="price">ราคา:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className='inp4'
          />
        </div>

        {/* รายละเอียด */}
        <div className="form-group4">
          <label htmlFor="details">รายละเอียด:</label>
          <input
            type="text"
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            className='inp4'
          />
        </div>

        {/* ส่วนประกอบ */}
        <div className="form-group4">
          <label htmlFor="component">ส่วนประกอบ:</label>
          <input
            type="text"
            id="component"
            name="component"
            value={formData.component}
            onChange={handleChange}
            className='inp4'
          />
        </div>

        {/* ทำเสร็จ */}
        <div className="form-group4">
          <label htmlFor="todo">วิธีการทำ:</label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={formData.todo}
            onChange={handleChange}
            className='inp4'
          />
        </div>

        {/* ประเภท - เปลี่ยนเป็น select */}
        <div className="form-group4">
          <label htmlFor="type">ประเภท:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className='inp4'
           
            required
          >
            <option value="">เลือกประเภท</option>
            <option value="สเต็ก">สเต็ก</option>
            <option value="อาหารทานเล่น">อาหารทานเล่น</option>
            <option value="เครื่องดื่ม">เครื่องดื่ม</option>
            
          </select>
        </div>

        {/* ปุ่มบันทึก */}
        <button type="submit" className="save-button4">บันทึก</button>
      </form>
    </div>
  );
};

export default Edshowmenu4;
