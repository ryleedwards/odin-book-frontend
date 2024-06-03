import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error-page';
import Root, { loader as rootLoader } from './routes/root';
import LoginPage, { action as loginAction } from './pages/login';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [],
  },
  {
    path: '/login',
    action: loginAction,
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
