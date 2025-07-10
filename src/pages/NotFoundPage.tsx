import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>404 | Page Not Found</h2>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
        Go Back
      </Button>
    </div>
  );
};
