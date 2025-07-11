import { clearUser, logout, UserState } from "@educational-loan-portal/store";
import Cookies from "js-cookie";

export const updateUserDetails = (user: UserState, dispatch: any, navigate: any, login: any, setUser: any, showSnackbar: any) => {
  dispatch(setUser(user));
  dispatch(login({ role: user.role }));
  dispatch(showSnackbar({ message: 'Login successful!', severity: 'success' }));
  // Redirect to role-based dashboard
  const roleRedirectMap: Record<string, string> = {
    admin: '/admin',
    user: '/client',
    'super-admin': '/admin/dashboard',
  };
  navigate(roleRedirectMap[user.role || ''] || '/', { replace: true });
};

export const resetUserDetails = (navigate: any, dispatch: any, navigateTo: string = '/login') => {
  dispatch(clearUser());
  dispatch(logout());
  localStorage.clear();
  Cookies.remove('accessToken');
  navigate(navigateTo);
};