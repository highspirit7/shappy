import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill, BsCart } from 'react-icons/bs';

import { login, logout, onUserStateChanged } from '../api/firebase';

import type { User } from 'firebase/auth';
import Profile from './Profile';

const Navbar: FC = (props) => {
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
    <header className="flex justify-between border-b border-gray-300 p-4">
      <Link
        to="/"
        className="flex items-center mr-2 text-3xl md:text-4xl text-brand"
      >
        <FiShoppingBag />
        <h1>Shappy</h1>
      </Link>
      <nav className="flex items-center gap-2 md:gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/cart" className="md:text-2xl">
          <BsCart />
        </Link>
        <Link to="/products/add" className="md:text-2xl">
          <BsPencilFill />
        </Link>
        {user != null && <Profile user={user} />}
        {user != null ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
