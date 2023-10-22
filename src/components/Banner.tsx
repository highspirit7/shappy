import React, { type FC } from 'react';

const Banner: FC = () => {
  return (
    <section className="h-96 relative">
      <div className="w-full h-full bg-cover bg-banner"></div>
      <div className="absolute w-full top-32 text-center text-white">
        <h2 className='text-5xl mb-2'>Shop With US</h2>
        <p className='text-2xl'>Best Products, High Quality</p>
      </div>
    </section>
  );
};

export default Banner;
