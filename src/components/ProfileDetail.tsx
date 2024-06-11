import { Profile } from '@/types/Profile';
import ProfileImage from './ProfileImage';
import Button from '@/components/Button';

type ProfileDetailProps = {
  profile: Profile | null;
  className?: string;
  children?: React.ReactNode;
};

export const ProfileDetail = ({ profile, className }: ProfileDetailProps) => {
  return (
    <div
      id='profile-detail'
      className={`${className} w-full flex flex-col items-center bg-white p-4 rounded-lg gap-4`}
    >
      {profile && <>{<ProfileImage url={profile.image} />}</>}
      {profile && (
        <>{<p className='text-2xl font-bold'>{profile.user.name}</p>}</>
      )}
      <Button className='bg-blue-600 hover:bg-blue-700 text-white rounded-md'>
        Follow
      </Button>
      <div id='profile-about' className='flex flex-col items-center '>
        <p className='text-gray-600'>About</p>
        <p className='text-center'>{profile?.about}</p>
      </div>
    </div>
  );
};
