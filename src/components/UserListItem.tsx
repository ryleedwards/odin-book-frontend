import { User } from '@/types/User';
import UserAvatar from './UserAvatar';
import { Button } from './ui/button';

type UserListItemProps = {
  user: User;
};
export const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <div className='flex items-center gap-2 p-2 bg-white rounded-md'>
      <UserAvatar user={user} />
      <div className='flex flex-col'>
        <p>{user.name}</p>
        <p className='text-sm text-gray-500 max-w-xs md:max-w-full overflow-hidden whitespace-nowrap text-ellipsis'>
          {user.profile.about}
        </p>
      </div>
      <Button className='ml-auto bg-blue-600'>X</Button>
    </div>
  );
};
