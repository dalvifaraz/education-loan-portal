import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ClientDashboard,
  AdminDashboard,
} from '@educational-loan-portal/features';
import { NotFoundPage } from '@educational-loan-portal/pages';
import { PrivateRoute } from './PrivateRoute';
import { useEffect } from 'react';

export const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasLogs = params.get('logs') === 'true';

    if (hasLogs) {
      localStorage.setItem('enableLogs', 'true');
    }

    if (!hasLogs && localStorage.getItem('enableLogs') === 'true') {
      params.set('logs', 'true');
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/client/dashboard"
        element={
          <PrivateRoute role="user">
            <ClientDashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
