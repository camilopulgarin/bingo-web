import React from 'react';
import { Box, Typography } from '@mui/material';

const LoginHeader = () => {
  return (
    <Box textAlign="center" mb={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido
      </Typography>
      <Typography variant="subtitle1">
        Por favor, ingresa tus credenciales para continuar.
      </Typography>
    </Box>
  );
};

export default LoginHeader;
