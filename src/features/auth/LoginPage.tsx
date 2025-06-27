import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { TextInput } from '@educational-loan-portal/components';
import { loginUser } from '@educational-loan-portal/services';
import { login, showSnackbar } from '@educational-loan-portal/store';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(formData);
      dispatch(login({ token: res.token, role: res.role }));
      dispatch(showSnackbar({ message: 'Login successful!', severity: 'success' }));
      navigate(res.role === 'admin' ? '/admin/dashboard' : '/client/dashboard');
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.message || 'Invalid credentials',
          severity: 'error',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" align="center" gutterBottom>
          Education Loan Portal Login
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextInput name="email" label="Email" value={formData.email} onChange={handleChange} />
          <TextInput
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
