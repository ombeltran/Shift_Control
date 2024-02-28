import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import DashBorad from './pages/DashBoard';
import CustomProvider from './context/CustomProvider';
import NextCustomer from './pages/NextCustomer';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import NavBar from './pages/NavBar';
import Login from './pages/Login';


const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: '30px',
  transition: transitions.SCALE
};

const App = () => {
  return (
    <>
      <CustomProvider>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/login' element={<Login />} />
            <Route path='/employees' element={<><NavBar /> <Employees /></>} />
            <Route path='/dashboard' element={<><NavBar /> <DashBorad /></> } />
            <Route path='/nextcustomer' element={<><NavBar /> <NextCustomer /></>} />
          </Routes>
        </AlertProvider>
      </CustomProvider>
    </>
  )
}

export default App