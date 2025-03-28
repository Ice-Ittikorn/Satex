import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import './Paymentterminal.css';

const Paymentterminal = () => {
  const location = useLocation();
  const navigate = useNavigate();  
  const queryParams = new URLSearchParams(location.search);
  const tableId = queryParams.get('table');
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showCardInput, setShowCardInput] = useState(false); // State to control credit card input visibility
  const [cardNumber, setCardNumber] = useState(""); // State to store the card number input

  useEffect(() => {
    if (tableId) {
      fetch(`http://localhost:3002/api/orders/table/${tableId}`)
        .then(response => response.json())
        .then(data => {
          setOrders(data.orders);
          setTotalPrice(data.orders.reduce((sum, item) => sum + item.price, 0));
        })
        .catch(error => console.error("Error fetching orders:", error));
    }
  }, [tableId]);

  const handleCashPayment = () => {
    setIsPaid(true);
    setTimeout(() => {
      toast.success(`โต๊ะ ${tableId} ชำระเงินด้วยเงินสดเรียบร้อยแล้ว!`);
      handlePaymentSuccess();
    }, 2000);
  };

  const handleQRCodePayment = () => {
    setShowQRCode(true); // Show QR code modal
    setTimeout(() => {
      setShowQRCode(false); // Close the modal after 3 seconds
    }, 3000); // Set the time for QR code display
  };

  const handleCreditCardPayment = () => {
    setShowCardInput(true);  // Show credit card input field
  };

  const handleCardSubmit = () => {
    if (cardNumber) {
      toast.success(`บัตรเครดิต ${cardNumber} ชำระเงินเรียบร้อยแล้ว!`);
      setShowCardInput(false); // Hide the input field after submitting the card number
      handlePaymentSuccess();
    } else {
      toast.error("กรุณากรอกหมายเลขบัตรเครดิต");
    }
  };

  const handlePaymentSuccess = () => {
    fetch(`http://localhost:3002/api/orders/table/${tableId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Orders deleted:', data);
        navigate("/Payment2");
      })
      .catch(error => {
        console.error('Error deleting orders:', error);
      });
    setIsPaid(false);
  };

  return (
    <div className="payment-terminal">
      <h1>โต๊ะ {tableId}</h1>

      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <span>{order.name}</span>
              <span>{order.price} บาท</span>
            </div>
          ))
        ) : (
          <p>ไม่มีรายการสั่งซื้อ</p>
        )}
      </div>

      <h2>ราคารวม: {totalPrice} บาท</h2>

      <div className="payment-methods">
        <button 
          className="payment-button"
          onClick={handleCashPayment}
          disabled={isPaid}
        >
          เงินสด
        </button>
        <button 
          className="payment-button"
          onClick={handleQRCodePayment}
          disabled={isPaid}
        >
          QR Code
        </button>
        <button 
          className="payment-button"
          onClick={handleCreditCardPayment}
          disabled={isPaid}
        >
          บัตรเครดิต
        </button>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="qr-modal">
          <div className="qr-modal-content">
            <img src="/QR.png" alt="QR Code" className="qr-image" />
            <button onClick={() => setShowQRCode(false)} className="close-qr-modal">
              ปิด
            </button>
          </div>
        </div>
      )}

      {/* Credit Card Input */}
      {showCardInput && (
        <div className="card-input-container">
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="กรุณากรอกหมายเลขบัตรเครดิต"
            maxLength="16"
            className="card-input"
          />
          <button onClick={handleCardSubmit} className="submit-card-button">
            ยืนยันการชำระเงิน
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Paymentterminal;
