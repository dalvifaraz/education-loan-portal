import { useEffect, useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { TextInput } from '@educational-loan-portal/components';
import { getCurrentSessionV2, registerUserV2 } from '@educational-loan-portal/services';
import { hideLoader, login, setUser, showLoader, showSnackbar, UserState } from '@educational-loan-portal/store';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUserDetails, updateUserDetails } from '@educational-loan-portal/utils';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    const checkSession = async () => {
      try {
        dispatch(showLoader());
        const { user } = await getCurrentSessionV2();
        updateUserDetails(user, dispatch, navigate, login, setUser, showSnackbar);
      } catch (e) {
        // Catch error for session check.
        resetUserDetails(navigate, dispatch, '/register');
      } finally {
        dispatch(hideLoader());
      }
    };

    checkSession();
  }, []);

  const validateField = (name: string, value: string) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (name === 'name') {
        if (!value.trim()) updatedErrors.name = 'Full name is required';
        else delete updatedErrors.name;
      }

      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) updatedErrors.email = 'Email required.';
        else if (!emailRegex.test(value)) updatedErrors.email = 'Email is not valid.';
        else delete updatedErrors.email;
      }

      if (name === 'password') {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,15}$/;
        if (!value) updatedErrors.password = 'Password is required';
        else if (!passwordRegex.test(value))
          updatedErrors.password = '4–15 chars, uppercase, lowercase, number, special char';
        else delete updatedErrors.password;

        // Also re-validate confirmPassword if it exists
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          updatedErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete updatedErrors.confirmPassword;
        }
      }

      if (name === 'confirmPassword') {
        if (!value) updatedErrors.confirmPassword = 'Please confirm your password';
        else if (value !== formData.password)
          updatedErrors.confirmPassword = 'Passwords do not match';
        else delete updatedErrors.confirmPassword;
      }

      return updatedErrors;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, confirmPassword } = formData;

    try {
      dispatch(showLoader());
      const user: UserState = await registerUserV2({ name, email, password, confirmPassword });
      updateUserDetails(user, dispatch, navigate, login, setUser, showSnackbar);
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Registration failed';
      dispatch(showSnackbar({ message, severity: 'error' }));
    } finally {
      dispatch(hideLoader());
      setLoading(false);
    }
  };

  const isDisabled =
    loading || Object.values(errors).some(Boolean) || Object.values(formData).some((v) => !v);

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" align="center">
          Register
        </Typography>
        {/* {error && <Typography color="error">{error}</Typography>} */}
        <form onSubmit={handleSubmit}>
          <TextInput
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextInput
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextInput
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Typography variant="body2" align="center" mt={2}>
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
          <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit" disabled={isDisabled}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};
