import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import DashBorad from './pages/DashBoard';
import UserProvider from './context/UserProvider';
import NextCustomer from './pages/NextCustomer';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import NavBar from './pages/NavBar';
import Login from './pages/Login';
import { IsAuth } from "./context/isAuth";

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: '30px',
  transition: transitions.SCALE
};

const App = () => {
  return (
    <>
      <UserProvider>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/login' element={<Login />} />
            <Route path='/employees' element={<><IsAuth/> <NavBar /> <Employees /></>} />
            <Route path='/dashboard' element={<><IsAuth /> <NavBar /> <DashBorad /></> } />
            <Route path='/nextcustomer' element={<><IsAuth /> <NavBar /> <NextCustomer /></>} />
          </Routes>
        </AlertProvider>
      </UserProvider>
    </>
  )
}

export default App