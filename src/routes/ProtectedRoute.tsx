import React from 'react';
import { Navigate } from 'react-router-dom';

import type { FC, ReactNode } from 'react';

import { useAuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  requireAdmin,
  children
}) => {
  const { user } = useAuthContext();

  if (user?.uid === '') return null;

  if (!requireAdmin && user?.displayName != null) {
    return <>{children}</>;
  }

  if (requireAdmin && user?.isAdmin === true) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
