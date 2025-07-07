import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const useRedirectIfAuthenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    const role = localStorage.getItem('role');

    console.info('hello', console.log(Cookies.get()));

    if (token && role === 'client') {
      navigate('/client/dashboard');
    } else if (token && role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, []);
};
