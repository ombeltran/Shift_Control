import React from 'react';
import Home from "./pages/Home";
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import { Route, Routes } from "react-router-dom";
import CustomProvider from './context/CustomProvider';


const App = () => {
  return (
    <>
      <CustomProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/customers' element={<Customers />} />
        </Routes>
      </CustomProvider>
    </>
  )
}

export default App