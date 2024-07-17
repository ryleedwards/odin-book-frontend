import { User } from '@/types/User';
import UserAvatar from './UserAvatar';
import { Button } from './ui/button';
import { authProvider } from '@/auth/auth';
import { Link } from 'react-router-dom';
import UnfollowButton from './buttons/UnfollowButton';

type UserListItemProps = {
  user: User;
};
export const UserListItem = ({ user }: UserListItemProps) => {
  const isFollowed = user.followers?.some(
    (follower) => follower.followerId === authProvider.user?.id
  );
  return (
    <div
      id='user-list-item'
      className='flex items-center gap-2 p-2 bg-white rounded-md'
    >
      <Link to={`/users/${user.id}`}>
        <UserAvatar user={user} />
      </Link>

      <div className='flex flex-col'>
        <Link to={`/users/${user.id}`}>
          <span className='hover:underline'>{user.name}</span>
        </Link>
        <span className='text-sm text-gray-500 max-sm:hidden w-96 overflow-hidden whitespace-nowrap text-ellipsis'>
          {user.profile.about}
        </span>
      </div>

      {isFollowed ? (
        <UnfollowButton className='ml-auto' />
      ) : (
        <Button className='ml-auto bg-blue-600'>Follow</Button>
      )}
    </div>
  );
};
