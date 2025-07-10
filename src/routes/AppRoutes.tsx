import { Routes, Route, Navigate } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  AdminDashboard,
  ClientDashboard,
  ClientAccount,
  ClientHome,
  ClientLayout,
  ClientService
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
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/client"
        element={
          <PrivateRoute>
            <ClientLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<ClientHome />} /> {/* /client */}
        <Route path="dashboard" element={<ClientDashboard />} /> {/* /client/dashboard */}
        <Route path="account" element={<ClientAccount />} /> {/* /client/account */}
        <Route path="customer-service" element={<ClientService />} /> {/* /client/client-service */}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
