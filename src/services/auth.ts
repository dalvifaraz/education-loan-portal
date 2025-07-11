// src/services/auth.ts
import { UserState } from '@educational-loan-portal/store';
import API from './api';

export const registerUserV2 = async ({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<UserState> => {
  const { data } = await API.post(
    'auth/register',
    {
      name,
      email,
      password,
      confirmPassword,
      role: 'user'
    }
  );
  return data;
};

export const loginUserV2 = async (data: { email: string; password: string }) => {
  const res = await API.post('auth/login', data);
  return res.data;
};

export const logoutUserV2 = async () => await API.post('auth/logout');

export const getCurrentSessionV2 = async () => {
  const response = await API.get('session');
  return response.data;
}

export const emailVerificationV2 = async (otp: string[]) => {
  const response = await API.post('auth/verify/email', { code: otp.join('') });
  return response.data;
}

export const forgotPasswordV2 = async (email: string) => {
  const response = await API.post('auth/password/forgot', { email });
  return response.data;
};
