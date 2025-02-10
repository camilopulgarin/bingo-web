// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ mt: 4, p: 2, backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">© 2025 Bingo Web. Todos los derechos reservados.</Typography>
    </Box>
  );
};

export default Footer;
