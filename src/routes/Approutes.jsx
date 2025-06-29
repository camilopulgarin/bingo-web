import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import ProtectedRoute from '../components/ProtectedRoute'; // Importa el componente ProtectedRoute
import Dashboard from '../pages/dashboard';
import Home from '../pages/home/home';
import GameHistory from '../pages/rooms/games-history';
import NewRoom from '../pages/rooms/newRoom/index';
import UserSettings from '../pages/settings/UserSettings';
import RandomBingoTable from '../pages/game';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para Login */}
        <Route path="/login" element={<Login />} />
        {/* Redireccionar a login por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        
        {/* Ruta de Registro */}
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas con ProtectedRoute */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<h1>Perfil</h1>} />} />
        <Route path="/settings" element={<ProtectedRoute element={<UserSettings />} />} />
        <Route path="/game-history" element={<ProtectedRoute element={<GameHistory />} />} />
        <Route path="/newRoom" element={<ProtectedRoute element={<NewRoom />} />} />
        <Route path="/game" element={<ProtectedRoute element={<RandomBingoTable />} />} />
        <Route path="/" element={<Home />}/>
        
        {/* Redireccionar a login por defecto */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
