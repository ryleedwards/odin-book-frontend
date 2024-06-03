import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect, useLoaderData } from 'react-router-dom';
import Layout from '../components/Layout';
import { authProvider } from '../auth/auth';
import { User } from '../auth/auth';

export async function loader({ request }: LoaderFunctionArgs) {
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return { user: authProvider.user };
}

const Root: React.FC = () => {
  const { user } = useLoaderData() as { user: User | null };
  return (
    <>
      <Layout>
        <>
          <h1>Root</h1>
          <p>The logged in user is: {user ? user.email : 'null'}</p>
        </>
      </Layout>
    </>
  );
};

export default Root;
