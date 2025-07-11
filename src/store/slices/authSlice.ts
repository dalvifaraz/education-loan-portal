import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, Role } from '@educational-loan-portal/types';

const initialState: AuthState = {
  role: localStorage.getItem('role') as Role,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ role: Role }>) => {
      state.role = action.payload.role;
      localStorage.setItem('role', action.payload.role || '');
    },
    logout: (state) => {
      state.role = null;
      localStorage.removeItem('role');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
