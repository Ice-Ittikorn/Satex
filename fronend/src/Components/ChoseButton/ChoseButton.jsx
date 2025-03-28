import React from 'react';
import { ShoppingCart } from 'lucide-react';
import './ChoseButton.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ChoseButton = () => {
    const navigate = useNavigate();

    return (
        <Link to="/Editmu" className="cart-button">
        <ShoppingCart size={24} />
    </Link>
    );
};

export default ChoseButton;
