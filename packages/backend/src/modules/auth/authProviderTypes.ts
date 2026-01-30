export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
};

export interface IAuthProvider {
  verifyCredentials: (credentials: AuthCredentials) => Promise<AuthenticatedUser>;
}
