import Sidebar from './SideBar';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hideSidebar = location.pathname.startsWith('/game/');

  return (
    <div className="flex h-full bg-transparent">
      {!hideSidebar && (
        <>
          <div className="absolute top-4 left-4 sm:block">
            <IconButton onClick={() => setOpen(true)} className="text-gray-900">
              <Menu />
            </IconButton>
          </div>
          <Sidebar open={open} setOpen={setOpen} />
        </>
      )}

      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default Layout;






