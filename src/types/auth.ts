export interface User {
  isAdmin: boolean;
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface AuthContext {
  user: User | null;
  handleLogin: () => void;
  handleLogout: () => void;
}
