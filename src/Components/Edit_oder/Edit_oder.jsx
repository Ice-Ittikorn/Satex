import React, { useState } from 'react';
import './Edit_oder.css';

export const Edit_oder = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const products = [
    { Oder: 1, table: 1, name: "สันคอหมู", num: 2 },
    { Oder: 1, table: 1, name: "เป็ด", num: 1 },
    { Oder: 1, table: 1, name: "ไก่", num: 1 },
    { Oder: 2, table: 2, name: "สันคอหมู", num: 1 },
    { Oder: 2, table: 2, name: "ไก่", num: 3 },
    { Oder: 3, table: 3, name: "เนื้อวัว", num: 2 },
    { Oder: 3, table: 3, name: "เป็ด", num: 1 },
    { Oder: 3, table: 3, name: "ไก่", num: 2 },
    { Oder: 4, table: 4, name: "หมูกรอบ", num: 4 },
    { Oder: 4, table: 4, name: "สันคอหมู", num: 3 },
    { Oder: 5, table: 5, name: "สันคอหมู", num: 2 },
    { Oder: 5, table: 5, name: "เนื้อวัว", num: 1 },
    { Oder: 5, table: 5, name: "ไก่", num: 4 },
    { Oder: 6, table: 6, name: "หมูกรอบ", num: 1 },
    { Oder: 6, table: 6, name: "ไก่", num: 3 },
    { Oder: 7, table: 7, name: "สันคอหมู", num: 2 },
    { Oder: 7, table: 7, name: "เป็ด", num: 3 },
    { Oder: 7, table: 7, name: "เนื้อวัว", num: 1 },
    { Oder: 8, table: 8, name: "หมูกรอบ", num: 5 },
    { Oder: 8, table: 8, name: "ไก่", num: 3 },
    { Oder: 9, table: 9, name: "สันคอหมู", num: 1 },
    { Oder: 9, table: 9, name: "เป็ด", num: 2 },
    { Oder: 10, table: 10, name: "เนื้อวัว", num: 3 },
    { Oder: 10, table: 10, name: "ไก่", num: 1 },
    { Oder: 10, table: 10, name: "สันคอหมู", num: 2 },
    { Oder: 11, table: 11, name: "หมูกรอบ", num: 2 },
    { Oder: 11, table: 11, name: "เนื้อวัว", num: 1 },
  ];

  // Group products by Oder and Table
  const groupedProducts = products.reduce((acc, product) => {
    const key = `${product.Oder}-${product.table}`;
    if (!acc[key]) {
      acc[key] = { Oder: product.Oder, table: product.table, items: [] };
    }
    acc[key].items.push(product);
    return acc;
  }, {});

  return (
    <div>
      <div className='oderbar'>
        <label className='edit_oder'>จัดการออเดอร์ :</label>
        <button
          className={`button_edit_oder_all ${selectedButton === 'all' ? 'active' : ''}`}
          onClick={() => handleButtonClick('all')}
        >
          ออเดอร์ทั้งหมด
        </button>
        <button
          className={`button_edit_oder_cancel ${selectedButton === 'cancel' ? 'active' : ''}`}
          onClick={() => handleButtonClick('cancel')}
        >
          ออเดอร์ที่ยกเลิก
        </button>
        <button
          className={`button_edit_oder_succeed ${selectedButton === 'succeed' ? 'active' : ''}`}
          onClick={() => handleButtonClick('succeed')}
        >
          ออเดอร์ที่สำเร็จ
        </button>
      </div>

      <div className="oder_grid">
        {Object.values(groupedProducts).map((group) => (
          <div key={`${group.Oder}-${group.table}`} className="order-grid-item">
            <div className="order-card-header">
              <p className='oder_card_oder'>Order: {group.Oder}</p>
              <p className='oder_card_Table'>Table: {group.table}</p>
            </div>
            <span className='oder_card_list_1'>รายการสินค้า</span>
            <span className='oder_card_num'>จำนวนสินค้า</span>

            <div className="order-items">
            {group.items.map((product) => (
                <div key={product.name} className="order-item">
                <div className='order-item-details'>
                    <span className='oder_card_list'>{product.name}</span>
                    <span className='oder_card_num'>{product.num}</span>
                </div>
                </div>
            ))}
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};

export default Edit_oder;
