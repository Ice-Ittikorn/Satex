import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Store.css";


// Export default คอมโพเนนต์นี้
const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // ฟังก์ชันต่างๆ
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/stores");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);  // Set initial filtered products
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  }, [location.state]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.Storeid.toString().includes(searchTerm) ||  // Search by Storeid
          product.count.toString().includes(searchTerm) // Search by count quantity
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset to all products if search term is empty
    }
  }, [searchTerm, products]);

  const handleEditClick = (Storeid) => {
    navigate(`/StockMack/${Storeid}`);
  };

  const handleDeleteClick = (Storeid) => {
    if (window.confirm("คุณแน่ใจว่าจะลบสินค้านี้?")) {
      fetch(`http://localhost:3002/api/stores/${Storeid}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(() => fetchProducts())
      .catch(error => console.error("Error deleting product:", error));
    }
  };

  return (
    <div className="stock-container">
      <div className="header">
        {successMessage && <div className="success-message">{successMessage}</div>}  
        <h1 className="stock-title">สินค้าคงคลัง</h1>
        
        <Link to="/StockEdit">
          <button className="update-button">อัปเดตสต็อกสินค้า</button>
        </Link>
      </div>

      {/* Search box */}
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
              <div 
                key={`${product.Storeid}-${index}`}  // เพิ่ม index เพื่อให้ key เป็นเอกลักษณ์
                className={`employee-card ${isLowStock ? 'low-stock' : ''}`} 
              >
<img 
  src={`http://localhost:3002${product.image}`} 
  alt={product.name} 
  className="product-image" 
  onError={(e) => e.target.src = "/placeholder.jpg"} 
/>

                <p><strong>ชื่อสินค้า:</strong> {product.name}</p>
                <div className="employee-info">
                  <p><strong>รหัสสินค้า:</strong> {product.Storeid}</p>
                  <p><strong>จำนวนคงเหลือ:</strong> {product.count} {product.unit}</p>
                </div>
                <div className="employee-actions">
                  <button className="edit-button" onClick={() => handleEditClick(product.Storeid)}>
                    แก้ไข
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteClick(product.Storeid)}
                    title="ลบสินค้า"
                  >
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

// Export default คอมโพเนนต์นี้
export default Store;
