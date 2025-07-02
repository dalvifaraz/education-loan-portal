import { Navigate } from 'react-router-dom';
import { Role } from '@educational-loan-portal/types';

interface PrivateRouteProps {
  children: React.ReactNode;
  role: Role;
}

export const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (userRole !== role) {
    // Logged in but wrong role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
