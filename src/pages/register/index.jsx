import { Container, Box, Paper } from '@mui/material';
import RegisterHeader from './components/registerHeader';
import RegisterForm from './components/registerForm';
import { registerUser } from '../../redux/slices/authSlice'; // Importamos la acción de Redux
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch(); // Inicializamos useDispatch
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    console.log('Datos enviados:', data);

    try {
      // Enviamos la acción registerUser a Redux
      const result = await dispatch(registerUser(data));

      if (registerUser.fulfilled.match(result)) {
        toast.success('Registro exitoso. Redirigiendo al inicio de sesión...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(result.payload.message || 'Error al registrar');
      }

    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      toast.error(error.message || 'Error en el registro');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ width: '100%', p: 2, boxShadow: '0px 0px 20px 2px #000', background: 'transparent', color: '#111' }}>
        <Box>
          <RegisterHeader name="Registro de usuarios" />
          <RegisterForm onSubmit={handleRegister} />
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default Register;
