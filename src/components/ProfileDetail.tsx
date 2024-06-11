import { Profile } from '@/types/Profile';
import ProfileImage from './ProfileImage';

type ProfileDetailProps = {
  profile: Profile | null;
  className?: string;
  children?: React.ReactNode;
};

export const ProfileDetail = ({ profile, className }: ProfileDetailProps) => {
  return (
    <div
      id='profile-detail'
      className={`${className} w-full flex flex-col items-center bg-white p-4 rounded-lg`}
    >
      {profile ? <>{<ProfileImage url={profile.image} />}</> : <></>}
    </div>
  );
};
