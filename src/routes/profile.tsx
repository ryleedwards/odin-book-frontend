import {
  LoaderFunction,
  Outlet,
  Params,
  useLoaderData,
  useOutletContext,
} from 'react-router';
import {
  createFollow,
  deleteFollow,
  fetchIsFollowed,
  fetchProfile,
  fetchUserPosts,
} from '@/api/profile';
import { Profile as ProfileType } from '@/types/Profile';
import { ProfileDetail } from '@/components/ProfileDetail';
import Feed from '@/components/Feed';
import { Post } from '@/types/Post';
import { ActionFunction } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { authProvider } from '@/auth/auth';

type LoaderData = {
  userId: string;
  profile: ProfileType;
  userPosts: Post[];
  isSelf: boolean;
};

const action: ActionFunction = async () => {
  return { ok: true };
};

const loader: LoaderFunction = async ({ params }: { params: Params }) => {
  const { userId } = params;
  try {
    if (!userId) {
      throw new Response('Bad request', { status: 400 });
    }
    const profile = await fetchProfile(parseInt(userId));
    // get user posts
    const userPosts = await fetchUserPosts(parseInt(userId));
    if (!profile || !userPosts) {
      throw new Response('Profile not found', { status: 404 });
    }
    const isSelf = profile.user.id === authProvider.user?.id;
    return { userId, profile, userPosts, isSelf } as LoaderData;
  } catch (e) {
    console.error(e);
    throw new Response('Something went wrong', { status: 500 });
  }
};

const Profile = () => {
  const { userId, profile, userPosts, isSelf } = useLoaderData() as LoaderData;
  const { user } = useOutletContext() as { user: User | null };
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    async function checkIsFollowed() {
      if (!user) return;
      const response = await fetchIsFollowed(parseInt(userId), user.id);
      setIsFollowed(response.isFollowed);
    }
    checkIsFollowed();
  }, [user, userId]);

  const handleFollowToggle = async () => {
    if (isFollowed) {
      await deleteFollow(parseInt(userId));
    } else {
      await createFollow(parseInt(userId));
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <div className='flex flex-col gap-4'>
      <ProfileDetail
        profile={profile}
        className='md:max-w-2xl'
        isFollowed={isFollowed}
        onFollowToggle={handleFollowToggle}
        isSelf={isSelf}
      />
      <h3 className='text-xl font-bold ml-4'>Posts</h3>
      <Feed posts={userPosts} isFromProfile={true} />
      <Outlet />
    </div>
  );
};

Profile.loader = loader;
Profile.action = action;

export default Profile;
