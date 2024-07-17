import { User } from '@/types/User';
import UserAvatar from './UserAvatar';
import { authProvider } from '@/auth/auth';
import { Link } from 'react-router-dom';
import UnfollowButton from './buttons/UnfollowButton';
import FollowButton from './buttons/FollowButton';
import { createFollow, deleteFollow } from '@/api/profile';
import { useState } from 'react';

type UserListItemProps = {
  user: User;
};
export const UserListItem = ({ user }: UserListItemProps) => {
  const [isFollowed, setIsFollowed] = useState(
    user.followers?.some(
      (follower) => follower.followerId === authProvider.user?.id
    )
  );

  const handleFollowToggle = async () => {
    if (isFollowed) {
      await deleteFollow(user.id);
      setIsFollowed(false);
    } else {
      await createFollow(user.id);
      setIsFollowed(true);
    }
  };

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
        <UnfollowButton className='ml-auto' onClick={handleFollowToggle} />
      ) : (
        <FollowButton className='ml-auto' onClick={handleFollowToggle} />
      )}
    </div>
  );
};
