import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginHeader = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <Box textAlign="center" mb={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido
      </Typography>
      <Typography variant="subtitle1">
        Por favor, ingresa tus credenciales para continuar.
      </Typography>
      <Box mt={2}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleRedirect}
        >
          ¿No tienes cuenta? Regístrate aquí
        </Button>
      </Box>
    </Box>
  );
};

export default LoginHeader;
