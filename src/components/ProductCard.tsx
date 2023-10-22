import React from 'react';

import type { FC } from 'react';
import { type ProductFromDB } from '../types/product';

const ProductCard: FC<{ product: ProductFromDB }> = ({
  product: { image, title, category, price }
}) => {
  return (
    <li className="rounded-md shadow cursor-pointer">
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
