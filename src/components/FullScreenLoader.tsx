import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

export const FullScreenLoader = () => {
  const loading = useSelector((state: any) => state.ui.loading);

  return (
    <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
