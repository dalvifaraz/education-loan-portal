import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@educational-loan-portal/store';
import { JSX } from 'react';

export const PrivateRoute = ({
  children,
  role: allowedRole,
}: {
  children: JSX.Element;
  role: 'admin' | 'client';
}) => {
  const { token, role } = useSelector((state: RootState) => state.auth);

  if (!token || role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
};
