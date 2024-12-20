import React from 'react';
import { Container, Box, Paper } from '@mui/material';
import RegisterHeader from './components/registerHeader';
import RegisterForm from './components/registerForm';


const Register = () => {
  const handleRegister = (data) => {
    console.log('Datos enviados:', data);
    // Aquí puedes llamar a tu API o manejar la lógica de autenticación
  };

  return (
    <Container  maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
        <Box >
          <RegisterHeader />
          <RegisterForm onSubmit={handleRegister} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;