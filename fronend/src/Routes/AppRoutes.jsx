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
import Register from '../Pages/Register/Register';
import Edit_emp_gard from '../Pages/Edit_emp_gard/edit_emp_gard';
import { Add_emp } from '../Pages/add_emp/Add_emp';
import { StockEdit } from '../Pages/StockEdit/Stockedit';
import TerminalO from '../Pages/TerminalO/TerminalO'
import STM from '../Pages/STM/STM';
import Stockmack from '../Pages/Stockmack/Stockmack';
import Send from '../Pages/Send/Send';
import Chosemenu from '../Pages/Chosemenu/Chosemenu';


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
            <Route path='/Register' element={<Register/>}/>
            <Route path="/Edit_emp_gard/:empId" element={<Edit_emp_gard />} />
            <Route path='/Add_emp' element={<Add_emp/>}/>
            <Route path='/TerminalO' element={<TerminalO/>}/> 
            <Route path='/StockEdit' element={<StockEdit/>}/>
            <Route path='/STM' element={<STM/>}/>
            <Route path="/Stockmack/:storeid" element={<Stockmack/>} /> 
            <Route path="/Send" element={<Send/>} /> 
            <Route path="/Chosemenu" element={<Chosemenu/>} /> 

        </Routes>
    </Router>
    </>
  );
}

export default AppRoutes