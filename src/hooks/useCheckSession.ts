import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentSessionV2 } from '@educational-loan-portal/services';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '@educational-loan-portal/store';

export const useSessionCheck = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const validateSession = async () => {
      try {
        dispatch(showLoader());
        const { user } = await getCurrentSessionV2();

        const isAuthPage = ['/login', '/register'].includes(location.pathname);

        if (isAuthPage) {
          // Redirect to role-based dashboard
          const roleRedirectMap: Record<string, string> = {
            admin: '/admin',
            user: '/client',
            'super-admin': '/admin',
          };
          navigate(roleRedirectMap[user.role] || '/', { replace: true });
        }
      } catch (err) {
        const isProtectedRoute = location.pathname.includes('/dashboard');
        if (isProtectedRoute) {
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
        dispatch(hideLoader());
      }
    };

    validateSession();
  }, [navigate, location.pathname]);

  return loading;
};
