import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sendmenu.css';

export const DisplayMenu = () => {
    const [menuItems, setMenuItems] = useState([]);

    // Fetch the menu items from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3002/api/menu') // Adjust if your backend uses a different port
            .then((response) => {
                setMenuItems(response.data); // Set the fetched menu data to state
            })
            .catch((error) => {
                console.error('There was an error fetching the menu data:', error);
            });
    }, []);

    return (
        <div className="menu-container">
            <h2>Menu</h2>
            <div className="menu-items">
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <div key={item.menuid} className="menu-item">
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
