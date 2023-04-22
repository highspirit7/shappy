import React from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import './App.css';

const Home: FC = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
