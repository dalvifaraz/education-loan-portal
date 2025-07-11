import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, CircularProgress, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GlobarModal, TextInput } from '@educational-loan-portal/components';
import { forgotPasswordV2, getCurrentSessionV2, loginUserV2 } from '@educational-loan-portal/services';
import { login, setUser, showSnackbar, UserState } from '@educational-loan-portal/store';
import { resetUserDetails, updateUserDetails } from '@educational-loan-portal/utils';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailError, setForgotEmailError] = useState('');
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

  // Forgot password handlers
  const handleForgotSubmit = async () => {
    try {
      await forgotPasswordV2(forgotEmail);
      dispatch(
        showSnackbar({
          message: 'Password reset link has been sent to registered email.',
          severity: 'success',
        })
      );
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.message || 'Failed to send reset link.',
          severity: 'error',
        })
      );
    } finally {
      setForgotOpen(false);
      setForgotEmail('');
    }
  };

  const validateForgotEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email required.';
    if (!emailRegex.test(value)) return 'Email is not valid.';
    return '';
  };

  const renderForgotPasswordModal = () => {
      return (
        <GlobarModal
          open={forgotOpen}
          title={'Verify Email'}
          description={'Enter email to receive password reset link'}
          onConfirm={handleForgotSubmit}
          onClose={() => setForgotOpen(false)}
          isConfirmDisabled={forgotEmail.trim() === '' || !!forgotEmailError}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={forgotEmail}
            onChange={(e) => {
              setForgotEmail(e.target.value);
              setForgotEmailError(validateForgotEmail(e.target.value));
            }}
            required
            sx={{ mb: 2 }}
          />
        </GlobarModal>
      );
    };

  return (
    <Container maxWidth="xs">
      {renderForgotPasswordModal()}
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
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 1,
              mb: 1,
              cursor: 'pointer',
              color: 'primary.main',
              textDecoration: 'underline'
            }}
            onClick={() => setForgotOpen(true)}
          >
            Forgot password?
          </Typography>
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
