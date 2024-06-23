import type { LoaderFunctionArgs } from 'react-router-dom';
import {
  redirect,
  useLoaderData,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import Layout from '../components/Layout';
import { authProvider } from '../auth/auth';
import { User } from '../auth/auth';

type ContextType = { user: User | null };

async function loader({ request }: LoaderFunctionArgs) {
  if (!authProvider.isAuthenticated) {
    // Check local storage for access token

    const accessToken = localStorage.getItem('accessToken');

    // Verify token with auth server
    if (accessToken) {
      const status: boolean | undefined = await authProvider.getStatus(
        accessToken
      );

      if (status) {
        // Adding a redirect to /posts as home page
        if (location.pathname === '/') {
          return redirect('/posts');
        }
        return { user: authProvider.user };
      }
    }

    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return { user: authProvider.user };
}

const Root = () => {
  const { user } = useLoaderData() as { user: User | null };

  return (
    <>
      <Layout>
        <ScrollRestoration />
        <Outlet context={{ user } satisfies ContextType} />
      </Layout>
    </>
  );
};

Root.loader = loader;

export default Root;
