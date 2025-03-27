import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Sendmenu.css';

export const DisplayMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3002/api/menu')
            .then((response) => {
                setMenuItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching menu data:', error);
            });
    }, []);

    const handleItemClick = (item) => {
        navigate('/Chosemenu', { state: { item } });
    };

    return (
        <div className="menu-container">
            <h2>Menu</h2>
            <div className="menu-items">
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <div 
                            key={item.menuid} 
                            className="menu-item" 
                            onClick={() => handleItemClick(item)}
                        >
                            <h3>{item.name}</h3>
                            <p><strong>Price:</strong> {item.price}</p>
                            <p><strong>Details:</strong> {item.details}</p>
                            <img 
                                src={`http://localhost:3002${item.menuimg}`} 
                                alt={item.name} 
                                className="item-image" 
                                onError={(e) => e.target.src = "/placeholder.jpg"} 
                            />
                        </div>
                    ))
                ) : (
                    <p>No menu items available.</p>
                )}
            </div>
        </div>
    );
};

export default DisplayMenu;
