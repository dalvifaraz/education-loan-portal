// src/services/auth.ts
import { UserState } from '@educational-loan-portal/store';
import axios from 'axios';

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
  const { data } = await axios.post('http://localhost:8000/api/v1/auth/register', {
    name,
    email,
    password,
    confirmPassword,
  });
  return data;
};

export const loginUserV2 = async (data: { email: string; password: string }) => {
  const res = await axios.post('http://localhost:8000/api/v1/auth/login', data);
  return res.data;
};
