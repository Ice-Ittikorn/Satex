import React, { useState, useEffect } from "react";
import "./Statusmenu.css";
import "remixicon/fonts/remixicon.css";

export const Statusmenu = () => {
  const statuses = [
    { text: "รับออเดอร์แล้ว", icon: "ri-file-paper-fill" },
    { text: "กำลังเตรียมวัตถุดิบ", icon: "ri-shopping-basket-fill" },
    { text: "กำลังปรุงอาหาร", icon: "ri-knife-blood-fill" },
    { text: "พร้อมเสิร์ฟ", icon: "ri-restaurant-2-line" },
    { text: "เสร็จสิ้น", icon: "ri-restaurant-fill" },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < statuses.length - 1) {
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, statuses.length - 1));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  return (
    <div className="status-container">
      <h1 className="main-title">สถานะการทำเมนู</h1>
      <p className="table-number">โต๊ะ: 12</p>

      <div className="status-list">
        {statuses.map((status, index) => (
          <div key={index} className="status-item">
            <i className={`${status.icon} status-icon ${currentStep === index ? "green" : "gray"}`}></i>
            <p className={`status-text ${currentStep === index ? "green" : "gray"}`}>
              {status.text}
            </p>
          </div>
        ))}
      </div>

      {/* ปุ่มสั่งอาหารอีกครั้ง และ คอมเม้นเลย */}
      <div className="button-container">
        <button className="order-again">สั่งอาหารอีกครั้ง</button>
        <button className="comment-button">คอมเม้นเลย</button>
      </div>
    </div>
  );
};

export default Statusmenu;
