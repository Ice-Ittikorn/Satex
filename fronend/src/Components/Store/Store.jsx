import React from 'react';
import './Store.css';

export const Store = () => {
  // ข้อมูลสินค้า (จำลอง)
  const products = [
    { id: 1, code: "IN32", name: "สันคอหมู", stock: 62, expiry: "5 มิถุนายน 2568", status: "มีสต็อก", image: "meat.jpg" },
    { id: 2, code: "IN32", name: "สันคอหมู", stock: 0, expiry: "5 มิถุนายน 2568", status: "หมดสต็อก", image: "meat.jpg" },
    { id: 3, code: "IN32", name: "สันคอหมู", stock: 62, expiry: "5 มิถุนายน 2568", status: "มีสต็อก", image: "meat.jpg" },
    { id: 4, code: "IN32", name: "สันคอหมู", stock: 10, expiry: "5 มิถุนายน 2568", status: "มีสต็อก", image: "meat.jpg" },
    { id: 5, code: "IN32", name: "สันคอหมู", stock: 0, expiry: "5 มิถุนายน 2568", status: "หมดสต็อก", image: "meat.jpg" },
    { id: 6, code: "IN32", name: "สันคอหมู", stock: 25, expiry: "5 มิถุนายน 2568", status: "มีสต็อก", image: "meat.jpg" },
  ];

  return (
    <div className="stock-container">
      {/* ส่วนหัวของหน้า */}
      <div className="header">
        <h1 className="stock-title">สินค้าคงคลัง</h1>
        <button className="update-button">อัปเดตสต็อกสินค้า</button>
      </div>

      {/* ช่องค้นหา */}
      <div className="search-bar">
        <input type="text" placeholder="ค้นหาสินค้าด้วยรหัส หรือชื่อ" />
      </div>

      {/* รายการสินค้า */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <figure className="product-figure">
              <img src={product.image} alt={product.name} className="product-image" />
            </figure>
            <div className="product-details">
              <p><strong>รหัสสินค้า:</strong> {product.code}</p>
              <p><strong>ชื่อสินค้า:</strong> {product.name}</p>
              <p><strong>จำนวนคงเหลือ:</strong> {product.stock} ชิ้น</p>
              <p><strong>วันหมดอายุ:</strong> {product.expiry}</p>
              <p className={`status ${product.status === "หมดสต็อก" ? "out-of-stock" : "in-stock"}`}>
                {product.status}
              </p>
              <button className="edit-button">แก้ไข</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;