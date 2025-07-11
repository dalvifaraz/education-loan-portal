export type Role = 'admin' | 'user' | 'super-admin' | null;

export interface AuthState {
  role: Role;
}