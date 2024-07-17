import CldImage from './CldImage';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User } from '@/types/User';

type UserAvatarProps = {
  user: User;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <>
      <Avatar className='bg-gray-300 justify-center items-center'>
        {user.profile.image ? (
          <CldImage publicId={user.profile.image} />
        ) : (
          <AvatarFallback className='font-semibold bg-slate-300'>
            {user.name[0]}
          </AvatarFallback>
        )}
      </Avatar>
    </>
  );
};

export default UserAvatar;
