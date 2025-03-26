import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Terminal from '../../Components/Terminal/Terminal';

export const TerminalO = () => {
    return (
        <>
        <div className="home">
            <Terminal/>
        </div>
        </>
      );
}

export default TerminalO