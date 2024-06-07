import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error-page';
import Root from './routes/root';
import LoginPage from './pages/login';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: Home.loader,
      },
    ],
  },
  {
    path: '/login',
    action: LoginPage.action,
    loader: LoginPage.loader,
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
