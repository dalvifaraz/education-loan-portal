import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { NavBar } from './NavBar';
import { logoutUserV2 } from '@educational-loan-portal/services';
import { resetUserDetails } from '@educational-loan-portal/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@educational-loan-portal/store';
// Import your Navbar and Sidebar components

export const ClientLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutUserV2();
    resetUserDetails(navigate, dispatch);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        open={sidebarOpen}
        userName={name}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        handleLogout={handleLogout}
      />
      <div style={{ flex: 1 }}>
        <NavBar
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onLogout={handleLogout}
        />
        <main style={{ padding: '1rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
