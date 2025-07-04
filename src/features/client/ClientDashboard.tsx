// src/features/landing/LandingPage.tsx
import { useEffect, useState } from 'react';
// import { updateVerification } from '@/store/userSlice';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { NavBar } from './NavBar';
import { MainContent } from './MainContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, UserState } from '@educational-loan-portal/store';
import { GlobarModal } from '@educational-loan-portal/components';
import { useNavigate } from 'react-router-dom';
import { logoutUserV2 } from '@educational-loan-portal/services';

const mockVerifyUserAPI = async (code: string) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};

export const ClientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { isEmailVerified, name } = useSelector((state: RootState) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isEmailVerified) {
      setOpenModal(true);
    }
  }, [isEmailVerified]);

    const handleVerify = async () => {
    //   const response: any = await mockVerifyUserAPI(user?.code || '');
    //   if (response.success) {
    //     dispatch(updateVerification());
    //     setOpenModal(false);
    //   }
        setOpenModal(false);
        console.log('TODO: verify user api call needed');
    };

  const handleLogout = () => {
    logoutUserV2()
    localStorage.clear();
    navigate('/login')
  };

  return (
    <Box display="flex">
      <Sidebar
        open={sidebarOpen}
        userName={name}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Box flexGrow={1}>
        <NavBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
        <MainContent />
      </Box>
      <GlobarModal
        open={openModal}
        title={'Verify User'}
        description={'Click below btton to verify user'}
        onConfirm={handleVerify}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};
