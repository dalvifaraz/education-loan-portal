import { Navigate, useNavigate } from 'react-router-dom';
import { PrivateRouteProps } from '@educational-loan-portal/types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentSessionV2 } from '@educational-loan-portal/services';
import { resetUserDetails, updateUserDetails } from '@educational-loan-portal/utils';
import { login, setUser, showSnackbar } from '@educational-loan-portal/store';

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
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
  return <>{children}</>;
};
