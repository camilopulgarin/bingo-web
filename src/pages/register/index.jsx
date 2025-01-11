import { Container, Box, Paper } from '@mui/material';
import RegisterHeader from './components/registerHeader';
import RegisterForm from './components/registerForm';
import axios from 'axios';

const urlAPI = 'http://localhost:3000/api/v1';

const Register = () => {
  const handleRegister = async (data) => {
    console.log('Datos enviados:', data);

    try {
      // Realizar la petición POST a la API
      const response = await axios.post(`${urlAPI}/users`, {
        name: data.user,
        email: data.email,
        password: data.password
      });

      console.log('Respuesta de la API:', response.data);
      // Aquí puedes manejar lo que deseas hacer con la respuesta de la API (e.g., redirigir, mostrar mensaje, etc.)
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Manejar el error (mostrar mensaje, etc.)
    }

    // Aquí puedes llamar a tu API o manejar la lógica de autenticación
  };
// register
  return (
    <Container  maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }} >
      <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
        <Box >
          <RegisterHeader name='Registro de usuarios' />
          <RegisterForm onSubmit={handleRegister}/>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;


