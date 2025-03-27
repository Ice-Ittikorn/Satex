const Store = () => {
  // ...existing code...

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
            const isOutOfStock = product.count === 0;  // Check if stock is 0
            return (
              <div
                key={`${product.Storeid}-${index}`}
                className={`store-card ${isLowStock ? 'low-stock' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}  // Add out-of-stock class
              >
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
                  <button className="delete-btn" onClick={() => handleDeleteClick(product.Storeid)} title="ลบสินค้า"><i className="ri-delete-bin-5-line"></i></button>
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
