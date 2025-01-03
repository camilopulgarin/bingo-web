import { Container, Box, Paper } from '@mui/material';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';

const Login = () => {
  const handleLogin = (data) => {
    console.log('Datos enviados:', data);
    // Aquí puedes llamar a tu API o manejar la lógica de autenticación
  };
  // comentario de test
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh', justifyContent: "center" }}>
      <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
        <Box>
          <LoginHeader />
          <LoginForm onSubmit={handleLogin} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
