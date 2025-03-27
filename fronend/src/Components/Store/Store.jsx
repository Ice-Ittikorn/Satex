import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Store.css";

export const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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

  // Filter products based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.storeid.toString().includes(searchTerm) ||  // Search by storeid
          product.instore.toString().includes(searchTerm) // Search by instore quantity
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset to all products if search term is empty
    }
  }, [searchTerm, products]);

  const handleEditClick = (storeid) => {
    navigate(`/StockMack/${storeid}`);
  };

  const handleDeleteClick = (storeid) => {
    if (window.confirm("คุณแน่ใจว่าจะลบสินค้านี้?")) {
      fetch(`http://localhost:3002/api/stores/${storeid}`, {
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
          filteredProducts.map((product) => {
            const isLowStock = product.instore < 5;
            return (
              <div 
                key={product.storeid} 
                className={`employee-card ${isLowStock ? 'low-stock' : ''}`} 
              >
                <div className="product-image-wrapper">
                  <img 
                    src={`http://localhost:3002${product.imgstore}`} 
                    alt={product.name} 
                    className="product-image" 
                    onError={(e) => e.target.src = "/placeholder.jpg"} 
                  />
                </div>
                <p><strong>ชื่อสินค้า:</strong> {product.name}</p>
                <div className="employee-info">
                  <p><strong>รหัสสินค้า:</strong> {product.storeid}</p>
                  <p><strong>จำนวนคงเหลือ:</strong> {product.instore} {product.unit}</p>
                </div>
                <div className="employee-actions">
                  <button className="edit-button" onClick={() => handleEditClick(product.storeid)}>
                    แก้ไข
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteClick(product.storeid)}
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

export default Store;
