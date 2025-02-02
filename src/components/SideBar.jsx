import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, Settings, Person, Menu } from '@mui/icons-material';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const menuItems = [
  { label: 'Inicio', icon: <Home />, path: '/dashboard', roles: ['admin', 'user'] },
  { label: 'Configuración', icon: <Settings />, path: '/settings', roles: ['admin'] },
  { label: 'Perfil', icon: <Person />, path: '/profile', roles: ['admin', 'user', 'guest'] }
];

const Sidebar = ({ open, setOpen }) => {
    const role = "admin";
    const isDesktop = useMediaQuery('(min-width:960px)'); // Detecta si es escritorio
  
    return (
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop || open} // Abierto en escritorio, controlado en móviles
        onClose={() => setOpen(false)}
        sx={{ width: 250, flexShrink: 0 }}
        PaperProps={{ sx: { width: 250, bgcolor: 'gray.900', color: 'white' } }}
      >
        <List>
          {menuItems.filter(item => item.roles.includes(role)).map(({ label, icon, path }) => (
            <ListItem 
              key={label} 
              component={NavLink} 
              to={path} 
              className="hover:bg-gray-200"
              onClick={() => setOpen(false)} // Cierra en móvil
            >
              <ListItemIcon sx={{ color: "gray" }}>{icon}</ListItemIcon>
              <ListItemText sx={{ color: "gray" }} primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };

export default Sidebar;
