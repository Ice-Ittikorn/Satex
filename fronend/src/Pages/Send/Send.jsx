import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sendmenu from '../../Components/sendmenu/Sendmenu';
import ChoseButton from '../../Components/ChoseButton/ChoseButton';


export const Send = () => {
    return (
        <>
        <div className="home">
            <ChoseButton/>
            <Sendmenu/>
        </div>
        </>
      );
}

export default Send