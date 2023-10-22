import React, { type FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import { type ProductFromDB } from '../types/product';
import { getProducts } from '../api/firebase';
import ProductCard from '../components/ProductCard';

const Products: FC = () => {
  const { data, error, isLoading } = useQuery<ProductFromDB[], Error>({
    queryKey: ['products'],
    queryFn: getProducts
  });

  if (isLoading) {
    return (
      <section className="text-center">
        <p className="mt-24 text-2xl">Loading...</p>
      </section>
    );
  }

  if (error != null) {
    return (
      <section className="text-center">
        <p className="mt-24">{error.message}</p>
      </section>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </ul>
  );
};

export default Products;
