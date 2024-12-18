import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Store from "./pages/Store";
import NoPage from "./pages/NoPage";

import './styles/App.css';

// PrivateRoute you can only access if you have valid Json Web Token
const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Check for token in localStorage

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" replace />;
  }

  // If token exists render route
  return <Outlet />;
};


const App = () => {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/*Default route login page*/}
          <Route index element={<Login />} />

          {/*Protected Routes*/}
          <Route path="store" element={<PrivateRoute />}>
            <Route index element={<Store />}/>
          </Route>


          {/*Catch all invalid routes (404)*/}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    );
  };

export default App;
