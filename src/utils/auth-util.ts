import { UserState } from "@educational-loan-portal/store";

export const updateUserDetails = (user: UserState, dispatch: any, navigate: any, login: any, setUser: any, showSnackbar: any) => {
    dispatch(setUser(user));
    dispatch(login({ role: user.role }));
    dispatch(showSnackbar({ message: 'Login successful!', severity: 'success' }));
    if (user?.role === 'user') navigate('/client/dashboard');
    else if (user?.role === 'admin') navigate('/admin/dashboard');
  };
