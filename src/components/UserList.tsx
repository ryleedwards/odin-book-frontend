import { User } from '@/types/User';
import { UserListItem } from './UserListItem';

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  return (
    <div className='flex flex-col gap-2 max-w-md md:max-w-3xl'>
      {users.map((user) => {
        return <UserListItem key={user.id} user={user} />;
      })}
    </div>
  );
};

export default UserList;
