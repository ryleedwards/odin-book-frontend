import { Profile } from '@/types/Profile';
import ProfileImage from './ProfileImage';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

type ProfileDetailProps = {
  profile: Profile | null;
  className?: string;
  children?: React.ReactNode;
  isFollowed: boolean;
  onFollowToggle: () => void;
  isSelf: boolean;
};

export const ProfileDetail = ({
  profile,
  className,
  isFollowed,
  onFollowToggle,
  isSelf,
}: ProfileDetailProps) => {
  const [isPictureHovered, setIsPictureHovered] = useState(false);
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
      {profile && (
        <>
          {
            <ProfileImage
              imageId={profile.image}
              className='flex justify-end items-end'
              onMouseEnter={() => {
                setIsPictureHovered(true);
              }}
              onMouseLeave={() => {
                setIsPictureHovered(false);
              }}
            >
              {isSelf && isPictureHovered && (
                <Link to={'upload-profile-picture'} className='fixed'>
                  <Button className=' rounded-full bg-blue-600 text-white mb-4 h-10 w-10 flex justify-center items-center'>
                    <FaEdit className='' />
                  </Button>
                </Link>
              )}
            </ProfileImage>
          }
        </>
      )}
      {profile && (
        <>{<p className='text-2xl font-bold'>{profile.user.name}</p>}</>
      )}
      <Form method='post'>
        {isSelf ? (
          <Link to={'edit'}>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white rounded-md'>
              Edit
            </Button>
          </Link>
        ) : (
          <Button
            onClick={onFollowToggle}
            className='bg-blue-600 hover:bg-blue-700 text-white rounded-md'
            onMouseEnter={() => setBtnText(isFollowed ? 'Unfollow' : 'Follow')}
            onMouseLeave={() => setBtnText(isFollowed ? 'Following' : 'Follow')}
          >
            {btnText}
          </Button>
        )}
      </Form>

      <div id='profile-about' className='flex flex-col items-center '>
        <p className='text-gray-600'>About</p>
        <p className='text-center'>{profile?.about}</p>
      </div>
    </div>
  );
};
