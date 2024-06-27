import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error-page';
import Root from './routes/root';
import LoginPage from './routes/login';
import Profile from './routes/profile';
import Posts from './routes/posts';
import Post from './routes/post';
import EditProfileForm from './components/EditProfileForm';
import EditProfile from './routes/editProfile';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader,
    children: [
      {
        path: 'posts',
        element: <Posts />,
        errorElement: <ErrorPage />,
        loader: Posts.loader,
        action: Posts.action,
        children: [
          {
            path: ':postId',
            element: <Post />,
            loader: Post.loader,
            action: Post.action,
          },
        ],
      },
      {
        path: 'users',
        errorElement: <ErrorPage />,
        children: [
          {
            path: ':userId',
            loader: Profile.loader,
            action: Profile.action,
            element: <Profile />,
            children: [
              {
                path: 'posts/:postId',
                element: <Post />,
                loader: Post.loader,
                action: Post.action,
              },
              {
                path: 'edit',
                element: <EditProfile />,
                action: EditProfile.action,
                loader: EditProfile.loader,
              },
            ],
          },
        ],
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
