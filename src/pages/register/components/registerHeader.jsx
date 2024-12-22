
import React from 'react';
import { Box, Typography } from '@mui/material';
const RegisterHeader = () => {
    return (
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registro
        </Typography>
        <Typography variant="subtitle1">
          Por favor, ingresa tus datos para registrarte.
        </Typography>
      </Box>
    );
  };
  
  export default RegisterHeader;