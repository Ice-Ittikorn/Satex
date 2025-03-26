import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Statusmenu from '../../Components/Statusmenu/Statusmenu';

export const STM = () => {
    return (
        <>
        <div className="home">
            <Statusmenu/>
        </div>
        </>
      );
}

export default STM