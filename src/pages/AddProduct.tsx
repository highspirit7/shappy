import React, { useState } from 'react';

import type { ChangeEvent, FC, FormEvent } from 'react';
import { type Product } from '../types/product';
import Button from '../components/ui/Button';

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

  const hanldleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
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
    <section>
      <h2>새로운 제품 등록</h2>
      {(file != null) && (
        <img src={URL.createObjectURL(file)} alt="selected product file" />
      )}
      <form>
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
          type="text"
          name="sizes"
          value={product.sizes}
          placeholder="Products Sizes(Seprated by commas)"
          required
          onChange={hanldleChange}
        />
        <Button text="Add Product" onClick={hanldleSubmit} />
      </form>
    </section>
  );
};

export default AddProduct;
