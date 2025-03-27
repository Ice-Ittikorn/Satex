import React from 'react';
import { useLocation } from 'react-router-dom';

export const Chosemenu = () => {
    const location = useLocation();
    const { item } = location.state || {};

    if (!item) {
        return <p>No item selected.</p>;
    }

    return (
        <div>
            <h2>{item.name}</h2>
            <img src={`http://localhost:3002${item.menuimg}`} alt={item.name} />
            <p><strong>Price:</strong> {item.price}</p>
            <p><strong>Details:</strong> {item.details}</p>
            <p><strong>Component:</strong> {item.component}</p>
            <p><strong>To Do:</strong> {item.todo}</p>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>In Kitchen:</strong> {item.inkitchen}</p>
            <p><strong>Emg Name:</strong> {item.emgname}</p>
        </div>
    );
};

export default Chosemenu;
