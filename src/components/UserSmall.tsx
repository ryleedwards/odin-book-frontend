import { User } from '@/types/User';
import UserAvatar from './UserAvatar';
import { Link } from 'react-router-dom';

type UserSmallProps = {
  user: User;
};

const UserSmall = ({ user }: UserSmallProps) => {
  return (
    <div className='flex gap-2 items-center'>
      <Link to={`/users/${user.id}`}>
        <UserAvatar user={user} />
      </Link>
      <Link to={`/users/${user.id}`}>
        <h4 className='font-bold hover:underline'>{user.name}</h4>
      </Link>
    </div>
  );
};

export default UserSmall;
