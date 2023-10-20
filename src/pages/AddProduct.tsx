import React, { useState } from 'react';

import type { ChangeEvent, FC, FormEvent } from 'react';
import { type Product } from '../types/product';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';

const defaultProduct = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  description: '',
  sizes: ''
};

const AddProduct: FC = (props) => {
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const hanldleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    setIsUploading(true);
    event.preventDefault();

    if (file !== undefined) {
      void uploadImage(file)
        .then((data) => {
          addNewProduct(product, data.url)
            .then(() => {
              setSuccessMessage('Successfully added the product!');
              setTimeout(() => {
                setSuccessMessage('');
              }, 4000);
            })
            .catch(console.error);
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };
  const hanldleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = event.target;
    if (name === 'file') {
      setFile(files?.[0]);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl mb-4 mt-6">Add New Product</h2>
      {successMessage !== '' && <p className="my-2">✅ {successMessage}</p>}
      {file != null && (
        <img
          className="md:max-w-screen-md px-12 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="selected product file"
        />
      )}
      <form
        className="flex flex-col mx-auto md:max-w-screen-md px-12"
        onSubmit={hanldleSubmit}
      >
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={hanldleChange}
        />
        <input
          type="text"
          name="name"
          value={product.name}
          placeholder="Product Name"
          required
          onChange={hanldleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price}
          placeholder="Price"
          required
          onChange={hanldleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category}
          placeholder="Category"
          onChange={hanldleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description}
          placeholder="Product Description"
          onChange={hanldleChange}
        />
        <input
          className="mb-4"
          type="text"
          name="sizes"
          value={product.sizes}
          placeholder="Products Sizes(Separated by commas)"
          required
          onChange={hanldleChange}
        />
        <Button
          text={isUploading ? 'Uploading...' : 'Add Product'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
};

export default AddProduct;
