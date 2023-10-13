import React, { createContext, useContext, useEffect, useState } from 'react';

import type { ReactNode } from 'react';
import type { AuthContext, User } from '../types/auth';

import { onUserStateChanged, login, logout } from '../api/firebase';

const defaultUser = {
  uid: '',
  displayName: null,
  email: null,
  photoURL: null,
  isAdmin: false
};

const UserContext = createContext<AuthContext>({
  user: defaultUser,
  handleLogin: () => {},
  handleLogout: () => {}
});

export function AuthContextProvider({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<null | User>(null);

  const handleLogin = (): void => {
    login().catch(console.error);
  };

  const handleLogout = (): void => {
    logout()
      .then(() => {
        setUser(null);
      })
      .catch(console.error);
  };

  useEffect(() => {
    onUserStateChanged(setUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuthContext(): AuthContext {
  return useContext(UserContext);
}
