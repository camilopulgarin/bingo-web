import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';

const AppRoutes = () => {
  //comentario
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
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        
      </Routes>
    </Router>
  );
};

export default  AppRoutes;
