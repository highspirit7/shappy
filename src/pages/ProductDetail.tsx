import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import type { ChangeEvent, FC } from 'react';
import { type ProductFromDB } from '../types/product';
import { getProductById } from '../api/firebase';
import Button from '../components/ui/Button';

const ProductDetail: FC = (props) => {
  const routeParams = useParams();
  const productId = routeParams.id;

  const { data, error, isLoading } = useQuery<ProductFromDB, Error>({
    queryKey: ['products', productId],
    queryFn: async () => await getProductById(productId ?? '')
  });
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (data != null) {
      setSelectedOption(data.options[0]);
    }
  }, [data]);

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
    <>
      <ul className="flex p-6 pb-2">
        <li className="mx-4 text-gray-500 hover:text-blue-500 border-b border-white hover:border-blue-500">
          <Link to="/">Home</Link>
        </li>
        &gt;
        <li className="mx-4 text-gray-500 uppercase">{data?.category}</li>
      </ul>
      <section className="flex flex-col md:flex-row p-4">
        <img src={data?.image} className="w-full px-4 basis-7/12" />
        <div className="w-full flex flex-col p-4 basis-5/12">
          <h2 className="text-3xl font-bold pb-2">{data?.title}</h2>
          <p className="text-2xl font-bold py-2  border-b border-gray-400">
            €{data?.price}
          </p>
          <p className="pt-4 pb-2 text-lg">{data?.description}</p>
          <div className="pb-2">
            <label htmlFor="option" className="text-brand font-bold">
              Option:
            </label>
            <select
              id="option"
              value={selectedOption}
              onChange={handleOptionChange}
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
            >
              {data?.options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          <Button text="Add To Cart" />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
