export type Role = 'admin' | 'user' | 'super-admin' | null;

export interface AuthState {
  token: string | null;
  role: Role;
}