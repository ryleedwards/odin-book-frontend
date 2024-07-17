import { getUsers } from '@/api/user';
import UserList from '@/components/UserList';
import { User } from '@/types/User';
import { useLoaderData } from 'react-router-dom';

const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const view = url.searchParams.get('view');
  const users = await getUsers(view);
  return users;
};

const Users = () => {
  const users = useLoaderData() as User[];
  return <UserList users={users} />;
};

Users.loader = loader;

export default Users;
