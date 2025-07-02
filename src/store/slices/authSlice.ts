import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, Role } from '@educational-loan-portal/types';

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role') as Role,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; role: Role }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role || '');
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
