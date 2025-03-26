import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Payment2.css'

const Payment = () => {
  return (
    <div className='payment'>
      <h1>ระบบชำระเงิน</h1>
      <div className="payment_content">
        <button>โต๊ะ01</button>
        <button>โต๊ะ02</button>
        <button>โต๊ะ03</button>
        <button>โต๊ะ04</button>
        <button>โต๊ะ05</button>
        <button>โต๊ะ05</button>
        <button>โต๊ะ06</button>
        <button>โต๊ะ07</button>
        <button>โต๊ะ08</button>
        <button>โต๊ะ09</button>
        <button>โต๊ะ10</button>
        <button>โต๊ะ11</button>
        <button>โต๊ะ12</button>
        <button>โต๊ะ13</button>
      </div>
    </div>
  )
}

export default Payment