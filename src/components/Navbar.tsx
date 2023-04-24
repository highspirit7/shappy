import React, { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill, BsCart } from 'react-icons/bs';

import { login, logout } from '../api/firebase';

import type { User } from 'firebase/auth';

const Navbar: FC = (props) => {
  const [user, setUser] = useState<null | User>(null);

  const handleLogin = (): void => {
    login().then(setUser).catch(console.error);
  };

  const handleLogout = (): void => {
    logout().then(setUser).catch(console.error);
  };

  return (
    <header className="flex justify-between border-b border-gray-300 p-4">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shappy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/cart" className="text-2xl">
          <BsCart />
        </Link>
        <Link to="/products/add" className="text-2xl">
          <BsPencilFill />
        </Link>
        {user != null ? (
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
