import { Routes, Route, Navigate } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ClientDashboard,
  AdminDashboard,
} from '@educational-loan-portal/features';
import { NotFoundPage } from '@educational-loan-portal/pages';
import { PrivateRoute } from './PrivateRoute';

export const AppRoutes = () => {
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
          <PrivateRoute role="client">
            <ClientDashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
