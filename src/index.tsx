import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import AddProduct from './pages/AddProduct';
import AllProducts from './pages/AllProducts';
import MyCart from './pages/MyCart';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import './index.css';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: 'products',
        element: <AllProducts />
      },
      {
        path: 'products/add',
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AddProduct />
          </ProtectedRoute>
        )
      },
      {
        path: 'products/:id',
        element: <ProductDetail />
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute requireAdmin={false}>
            <MyCart />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
