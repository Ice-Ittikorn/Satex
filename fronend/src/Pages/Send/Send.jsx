import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sendmenu from '../../Components/sendmenu/Sendmenu';


export const Send = () => {
    return (
        <>
        <div className="home">
            <Sendmenu/>
        </div>
        </>
      );
}

export default Send