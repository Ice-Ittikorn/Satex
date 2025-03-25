import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Stock  from '../Pages/Stock/Stock';
import Payment from '../Pages/Payment/Payment';
import Edit_menu from '../Pages/Edit_menu/Edit_menu';
import Dashboard_menu from '../Pages/Dashboard_menu/Dashboard_menu';
import Manage_employee from '../Pages/Manage_employee/Manage_employee';
import { Oder } from '../Pages/Oder/Oder';


const AppRoutes = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Stock' element={<Stock/>}/>
            <Route path='/Edit_menu' element={<Edit_menu/>}/>
            <Route path='/Payment' element={<Payment/>}/>
            <Route path='/Dashboard_menu' element={<Dashboard_menu/>}/>
            <Route path='/Manage_employee' element={<Manage_employee/>}/>
            <Route path='/Oder' element={<Oder/>}/>

        </Routes>
    </Router>
    </>
  );
}

export default AppRoutes