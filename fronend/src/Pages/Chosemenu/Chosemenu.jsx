import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChoseMenu from '../../Components/ChoseMenu/ChoseMenu';

export const Chosemenu = () => {
    return (
        <>
        <div className="home">
            <ChoseMenu/>
        </div>
        </>
      );
}

export default Chosemenu