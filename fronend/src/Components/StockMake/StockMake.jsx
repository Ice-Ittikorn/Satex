import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Stockmack = () => {
  const [product, setProduct] = useState({ name: "", count: 0, unit: "", image: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { storeid } = useParams(); // Get storeid from URL params

  // ฟังก์ชันดึงข้อมูลสินค้าจาก server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/stores/${storeid}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [storeid]);

  // ฟังก์ชันสำหรับการอัปเดตข้อมูลสินค้า
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: product.name,
      count: product.count,
      unit: product.unit,
    };

    try {
      const response = await fetch(`http://localhost:3002/api/stores/${storeid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct), // ส่งข้อมูลในรูปแบบ JSON
      });

      if (response.ok) {
        setSuccessMessage("อัปเดตข้อมูลสินค้าสำเร็จ!");
        setTimeout(() => setSuccessMessage(''), 3000);
        navigate("/Stock"); // Redirect back to the store list page
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="stockmack-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <h1>แก้ไขข้อมูลสินค้า</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>ชื่อสินค้า:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label>รหัสสินค้า:</label>
          <input
            type="text"
            value={storeid} // ใช้รหัสสินค้าที่รับมาจาก URL
            disabled
          />
        </div>
        <div>
          <label>จำนวนคงเหลือ:</label>
          <input
            type="number"
            value={product.count}
            onChange={(e) => setProduct({ ...product, count: e.target.value })}
          />
        </div>
        <div>
          <label>หน่วย:</label>
          <input
            type="text"
            value={product.unit}
            onChange={(e) => setProduct({ ...product, unit: e.target.value })}
          />
        </div>
        <div>
          <label>ภาพสินค้า:</label>
          {product.image && (
            <div>
              <img src={`http://localhost:3002${product.image}`} alt="Product" width={100} />
            </div>
          )}
        </div>
        <button type="submit">อัปเดตข้อมูล</button>
      </form>
    </div>
  );
};

export default Stockmack;
