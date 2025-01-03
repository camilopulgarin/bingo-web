import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para Login */ }
        <Route path="/login" element={<Login />} />

        {/* Redireccionar a login por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} /> 
        <Route path="/register" element={<Register />} />
        {/* Redireccionar a login por defecto */}
        <Route path="*" element={<Navigate to="/register" replace />} /> 
      </Routes>
    </Router>
  );
};

export default  AppRoutes;
