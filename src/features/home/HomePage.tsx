// @features/home/HomePage.tsx
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} textAlign="center" boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h4" gutterBottom>
          Welcome to Education Loan Portal
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')} sx={{ m: 1 }}>
          Login
        </Button>
        <Button variant="outlined" onClick={() => navigate('/register')} sx={{ m: 1 }}>
          Register
        </Button>
      </Box>
    </Container>
  );
};
