import { Profile } from '@/types/Profile';
import ProfileImage from './ProfileImage';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';

type ProfileDetailProps = {
  profile: Profile | null;
  className?: string;
  children?: React.ReactNode;
  isFollowed: boolean;
};

export const ProfileDetail = ({
  profile,
  className,
  isFollowed,
}: ProfileDetailProps) => {
  const [btnText, setBtnText] = useState('');
  // set initial button text based on isFollowed prop
  //     ( when this was determined in initial useState call, would experience bug
  //     where button text would not be set correctly after refresh )
  useEffect(() => {
    setBtnText(isFollowed ? 'Following' : 'Follow');
  }, [isFollowed]);
  return (
    <div
      id='profile-detail'
      className={`${className} w-full flex flex-col items-center bg-white p-4 rounded-lg gap-4`}
    >
      {profile && <>{<ProfileImage url={profile.image} />}</>}
      {profile && (
        <>{<p className='text-2xl font-bold'>{profile.user.name}</p>}</>
      )}
      <Form method='post'>
        <Button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white rounded-md'
          onMouseEnter={() => setBtnText(isFollowed ? 'Unfollow' : 'Follow')}
          onMouseLeave={() => setBtnText(isFollowed ? 'Following' : 'Follow')}
        >
          {btnText}
        </Button>
      </Form>

      <div id='profile-about' className='flex flex-col items-center '>
        <p className='text-gray-600'>About</p>
        <p className='text-center'>{profile?.about}</p>
      </div>
    </div>
  );
};
