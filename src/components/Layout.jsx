import Sidebar from './SideBar';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full bg-gray-100">
      {/* Botón hamburguesa SOLO en móviles */}
      <div className="absolute top-4 left-4 md:hidden">
        <IconButton onClick={() => setOpen(true)} className="text-gray-900">
          <Menu />
        </IconButton>
      </div>

      {/* Sidebar recibe `open` y `setOpen` */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Contenido principal */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default Layout;
