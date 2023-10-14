export interface User {
  isAdmin: boolean;
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface IAuthContext {
  user: User | null;
  handleLogin: () => void;
  handleLogout: () => void;
}
