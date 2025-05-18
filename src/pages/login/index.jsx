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
      const result = await dispatch(loginUser(data));
  
      if (loginUser.fulfilled.match(result)) {
        toast.success('Inicio de sesión exitoso');
        navigate('/dashboard');
      } else {
        toast.error(result.payload.message)
      }
    } catch (error) {
      toast.error(typeof error.message === 'string' ? error.message : JSON.stringify(error.message));
    }
  };
  // comentario de test
  return (
    <Container  maxWidth={false} className="w-full max-w-xl flex items-center justify-center min-h-screen mx-auto bg-transparent">
      <Paper  className="!bg-[url('../src/assets/textura-amarillo.png')] w-full p-4  text-[#111]" >
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
