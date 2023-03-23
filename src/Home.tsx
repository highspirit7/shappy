import React from 'react';
import type { FC } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

const Home: FC = () => {
  return (
    <div className="bg-white">
      <header className="w-full h-16">Header</header>
      <Outlet />
    </div>
  );
};

export default Home;
