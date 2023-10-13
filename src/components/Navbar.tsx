import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill, BsCart } from 'react-icons/bs';

import type { FC } from 'react';
import type { AuthContext } from '../types/auth';

import { useAuthContext } from '../context/AuthContext';
import Profile from './Profile';
import Button from './ui/Button';

const Navbar: FC = (props) => {
  const { user, handleLogin, handleLogout }: AuthContext = useAuthContext();

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
