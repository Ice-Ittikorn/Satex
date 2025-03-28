import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Store.css";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // ฟังก์ชันดึงข้อมูลสินค้า
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/stores");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Set initial filtered products
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);  // แจ้งเตือนเมื่อมีการส่ง successMessage จาก StockEdit
    }
  }, [location.state]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.Storeid.toString().includes(searchTerm) ||
          product.count.toString().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset to all products if search term is empty
    }
  }, [searchTerm, products]);

  // ฟังก์ชันสำหรับการแก้ไขสินค้า
  const handleEditClick = (Storeid) => {
    // เมื่อคลิกแก้ไข, แสดงการแจ้งเตือนก่อนที่จะแก้ไข
    toast.success("กำลังเข้าสู่หน้าแก้ไขสินค้า...");
    navigate(`/StockMack/${Storeid}`);
  };

  // ฟังก์ชันสำหรับการลบสินค้า
  const handleDeleteClick = (Storeid) => {
    if (window.confirm("คุณแน่ใจว่าจะลบสินค้านี้?")) {
      fetch(`http://localhost:3002/api/stores/${Storeid}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          fetchProducts();
          toast.success("สินค้าถูกลบสำเร็จ!");  // แสดงการแจ้งเตือนเมื่อสินค้าถูกลบ
        })
        .catch(error => console.error("Error deleting product:", error));
    }
  };

  return (
    <div className="stock-container">
      {/* ToastContainer สำหรับการแจ้งเตือน */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="header">
        <h1 className="stock-title">สินค้าคงคลัง</h1>
        <Link to="/StockEdit">
          <button className="update-button">อัปเดตสต็อกสินค้า</button>
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ค้นหาสินค้าด้วยรหัส, ชื่อ หรือจำนวนคงเหลือ"
        />
      </div>

      <div className="employee-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            const isLowStock = product.count < 5;
            return (
              <div key={`${product.Storeid}-${index}`} className={`store-card ${isLowStock ? 'low-stock' : ''}`}>
                <p><strong>ชื่อสินค้า:</strong> {product.name}</p>
                <img
                  src={`http://localhost:3002${product.image}`}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => e.target.src = "/placeholder.jpg"}
                />
                <div className="gard-info2">
                  <p><strong>รหัสสินค้า:</strong> {product.Storeid}</p>
                  <p><strong>จำนวนคงเหลือ:</strong> {product.count} {product.unit}</p>
                </div>
                <div className="button-container2">
                  <button className="edit-btn2" onClick={() => handleEditClick(product.Storeid)}>แก้ไข</button>
                  <button className="delete-btn" onClick={() => handleDeleteClick(product.Storeid)} title="ลบสินค้า">
                    <i className="ri-delete-bin-5-line"></i>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
        )}
      </div>
    </div>
  );
};

export default Store;
