import React from 'react';

import type { FC } from 'react';
import { type ProductFromDB } from '../types/product';
import { useNavigate } from 'react-router-dom';

const ProductCard: FC<{ product: ProductFromDB }> = ({
  product: { id, image, title, category, price }
}) => {
  const navigate = useNavigate();

  return (
    <li
      className="transition duration-200 rounded-md shadow cursor-pointer hover:scale-105"
      onClick={() => {
        navigate(`/products/${id}`);
      }}
    >
      <img className="w-full" src={image} alt={title} />
      <div className="mt-2 px-2 text-lg">
        <h3>{title}</h3>
        <p>{`€${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
};

export default ProductCard;
