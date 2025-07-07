import { Navigate } from 'react-router-dom';
import { PrivateRouteProps } from '@educational-loan-portal/types';
import { useSessionCheck } from 'hooks/useCheckSession';

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  useSessionCheck();
  return <>{children}</>;
};
