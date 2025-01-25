import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register'; 
import AuthGuard from '../components/AuthGuard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/slices/authSlice';

const AppRoutes = () => {
  //comentario
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserProfile());
  // }, [dispatch]);
  return (
    <Router>
      <Routes>
        {/* Ruta para Login */ }
        <Route path="/login" element={<Login />} />
        {/* Redireccionar a login por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} /> 
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <h1>Dashboard</h1>
            </AuthGuard>
          }
        />
        {/* Redireccionar a login por defecto */}
        <Route path="*" element={<Navigate to="/register" replace />} />
        
      </Routes>
    </Router>
  );
};

export default  AppRoutes;
