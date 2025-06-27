import {
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { loginUser } from '@educational-loan-portal/services';
import { TextInput } from 'components/TextInput';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorField, setErrorField] = useState<'email' | 'password' | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setErrorField('email');
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorField('email');
      return 'Invalid email';
    }
    if (!formData.password.trim()) {
      setErrorField('password');
      return 'Password is required';
    }
    if (formData.password.length < 6) {
      setErrorField('password');
      return 'Password must be at least 6 characters';
    }
    setErrorField(''); // ✅ No errors
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(formData);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      window.location.href = res.role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || 'Invalid credentials');
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
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextInput
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errorField === 'email' ? errorMsg : ''}
            autoComplete="new-email"
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errorField === 'password' ? errorMsg : ''}
            autoComplete="new-password"
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
