import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentSessionV2 } from '@educational-loan-portal/services';

export const useSessionCheck = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const { user } = await getCurrentSessionV2();

        const isAuthPage = ['/login', '/register'].includes(location.pathname);

        if (isAuthPage) {
          // Redirect to role-based dashboard
          const roleRedirectMap: Record<string, string> = {
            admin: '/admin/dashboard',
            user: '/client/dashboard',
            'super-admin': '/admin/dashboard',
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
      }
    };

    validateSession();
  }, [navigate, location.pathname]);

  return loading;
};
