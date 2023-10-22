import React, { type FC } from 'react';

import Banner from '../components/Banner';
import Products from '../components/Products';

const Home: FC = () => {
  return (
    <section>
      <Banner />
      <Products />
    </section>
  );
};

export default Home;
