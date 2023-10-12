import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill, BsCart } from 'react-icons/bs';

import { login, logout, onUserStateChanged } from '../api/firebase';

import type { FC } from 'react';
import type { ShappyUser } from '../types/user';

import Profile from './Profile';
import Button from './ui/Button';

const Navbar: FC = (props) => {
  const [user, setUser] = useState<null | ShappyUser>(null);

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
        {user != null && (
          <Link to="/cart" className="md:text-2xl">
            <BsCart />
          </Link>
        )}
        {user?.isAdmin === true && (
          <Link to="/products/add" className="md:text-2xl">
            <BsPencilFill />
          </Link>
        )}
        {user != null && <Profile user={user} />}
        {user != null ? (
          <Button text={'Logout'} onClick={handleLogout} />
        ) : (
          <Button text={'Login'} onClick={handleLogin} />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
