import React from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';

const Home: FC = () => {
  return (
    <AuthContextProvider>
      <div className="bg-white">
        <Navbar />
        <Outlet />
      </div>
    </AuthContextProvider>
  );
};

export default Home;
