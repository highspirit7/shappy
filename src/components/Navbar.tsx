import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsPencilFill, BsCart } from 'react-icons/bs';

const Navbar: FC = (props) => {
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
        <button>Login</button>
      </nav>
    </header>
  );
};

export default Navbar;
