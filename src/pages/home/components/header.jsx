// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const logoSrc= "/logoBingoWeb.png";

const Header = () => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  return (
   

<Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box mb={0} sx={{ flexGrow: 1 }}>
          <img src={logoSrc} alt="Logo" style={{ width: '100px', height: 'auto', margin: '5px'}} />          
        </Box>
        
        
        <Button onClick={handleLoginRedirect} color="inherit">Login</Button>
        <Button onClick={handleRegisterRedirect} color="inherit">Register</Button>
        <Button color="inherit">Jugar Ahora</Button>
      </Toolbar>
    </AppBar>

    </Box>
  );
};

export default Header;
