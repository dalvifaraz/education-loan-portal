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
    },
    { withCredentials: true }
  );
  return data;
};

export const loginUserV2 = async (data: { email: string; password: string }) => {
  const res = await API.post('auth/login', data, {
    withCredentials: true,
  });
  return res.data;
};