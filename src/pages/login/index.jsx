import { Container, Box, Paper } from '@mui/material';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import { loginUser } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    console.log('Datos enviados:', data);
    try {
      await dispatch(loginUser(data));
      navigate('/dashboard');
      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      toast.error('Error al iniciar sesión');
    }
    


    // Aquí puedes llamar a tu API o manejar la lógica de autenticación
  };
  // comentario de test
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh', justifyContent: "center" }}>
      <Paper elevation={3} sx={{ width: '100%', p: 4, boxShadow: '0px 0px 20px 2px #000',  backgroundColor: '#eee' , color: '#111' }}>
        <Box>
          <LoginHeader />
          <LoginForm onSubmit={handleLogin} />
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default Login;
