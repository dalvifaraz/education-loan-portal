// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  enable2fa: boolean;
  emailNotification: boolean;
  _id: string;
}

export interface UserState {
  createdAt: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  updatedAt: string;
  userPreferences: UserPreferences;
  _id: string;
  __v?: number;
}

const initialState: UserState | null = {
    _id: '',
    name: '',
    email: '',
    isEmailVerified: false,
    userPreferences: {
        enable2fa: false,
        emailNotification: false,
        _id: ''
    },
    createdAt: '',
    updatedAt: '',
    __v: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<UserState>) => action.payload,
    updateVerification: (state) => {
      if (state) state.isEmailVerified = true;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateVerification, clearUser } = userSlice.actions;
export default userSlice.reducer;
