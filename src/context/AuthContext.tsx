import React, { createContext, useContext, useEffect, useState } from 'react';

import type { ReactNode } from 'react';
import type { IAuthContext, User } from '../types/auth';

import { onUserStateChanged, login, logout } from '../api/firebase';

const defaultUser = {
  uid: '',
  displayName: null,
  email: null,
  photoURL: null,
  isAdmin: false
};

const AuthContext = createContext<IAuthContext>({
  user: defaultUser,
  handleLogin: () => {},
  handleLogout: () => {}
});

export function AuthContextProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<null | User>(defaultUser);

  const handleLogin = (): void => {
    login().catch(console.error);
  };

  const handleLogout = (): void => {
    logout().catch(console.error);
  };

  useEffect(() => {
    onUserStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): IAuthContext {
  return useContext(AuthContext);
}
