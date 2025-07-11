import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { TextInput } from '@educational-loan-portal/components';
import { getCurrentSessionV2, loginUserV2 } from '@educational-loan-portal/services';
import { login, setUser, showSnackbar, UserState } from '@educational-loan-portal/store';
import { resetUserDetails, updateUserDetails } from '@educational-loan-portal/utils';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { user } = await getCurrentSessionV2();
        updateUserDetails(user, dispatch, navigate, login, setUser, showSnackbar);
      } catch (e) {
        // Catch error for session check.
        resetUserDetails(navigate, dispatch);
      }
    };

    checkSession();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isDisabled = !formData.email || !formData.password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await loginUserV2(formData);
      updateUserDetails(user, dispatch, navigate, login, setUser, showSnackbar);
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
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading || isDisabled}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Typography variant="body2" align="center" mt={2}>
            Don’t have an account? <Link to="/register">Register here</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};
