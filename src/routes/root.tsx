import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect, useLoaderData, Outlet } from 'react-router-dom';
import Layout from '../components/Layout';
import { authProvider } from '../auth/auth';
import { User } from '../auth/auth';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useLoaderData() as { user: User | null };

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

Root.loader = loader;

export default Root;
