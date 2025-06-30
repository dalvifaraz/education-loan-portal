import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigateWithLogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentParams = new URLSearchParams(location.search);
  const shouldPreserveLogs = currentParams.has('logs');

  return (to: string, options = {}) => {
    const fromPath = location.pathname + location.search;
    const target = new URL(to, window.location.origin);
    console.log(`[Navigation]: from "${fromPath}" to "${target}"`);
    if (shouldPreserveLogs) {
      const newParams = new URLSearchParams(target.search);
      newParams.set('logs', '');
      navigate(`${target.pathname}?${newParams.toString()}`, options);
    } else {
      navigate(to, options);
    }
  };
};
