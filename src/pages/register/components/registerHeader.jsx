
import React from 'react';
import { Box, Typography } from '@mui/material';
const RegisterHeader = ({ name="Registro", logoSrc= "../src/assets/logoBingoWeb.png"}) => {
    return (
      <Box textAlign="center" mb={0} display="flex" 
      justifyContent="space-evenly" >
        <Box mb={0}>
          <img src={logoSrc} alt="Logo" style={{ width: '100px', height: 'auto' }} />          
        </Box>
        <Box mb={0}>
        <Typography variant="h4" component="h1" gutterBottom>
            {name}
          </Typography>      
          <Typography variant="subtitle1">
            Por favor, ingresa tus datos para crear una nueva cuenta.
          </Typography>           
        </Box>  
        
      </Box>
    );
  };
  
export default RegisterHeader;
  