import {
  LoaderFunction,
  Params,
  useLoaderData,
  useOutletContext,
} from 'react-router';
import { fetchIsFollowed, fetchProfile, fetchUserPosts } from '@/api/profile';
import { Profile as ProfileType } from '@/types/Profile';
import { ProfileDetail } from '@/components/ProfileDetail';
import Feed from '@/components/Feed';
import { Post } from '@/types/Post';
import { ActionFunction } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';

type LoaderData = {
  userId: string;
  profile: ProfileType;
  userPosts: Post[];
};

const action: ActionFunction = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const { userId } = params;
  const formData = await request.formData();
  return { ok: true };
};

const loader: LoaderFunction = async ({ params }: { params: Params }) => {
  const { userId } = params;
  try {
    if (!userId) {
      throw new Response('Bad request', { status: 401 });
    }
    const profile = await fetchProfile(parseInt(userId));
    // get user posts
    const userPosts = await fetchUserPosts(parseInt(userId));
    if (!profile || !userPosts) {
      throw new Response('Profile not found', { status: 404 });
    }
    return { userId, profile, userPosts } as LoaderData;
  } catch (e) {
    throw new Response('Profile not found', { status: 404 });
  }
};

const Profile = () => {
  const { userId, profile, userPosts } = useLoaderData() as LoaderData;
  const { user } = useOutletContext() as { user: User | null };
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    async function checkIsFollowed() {
      if (!user) return;
      const response = await fetchIsFollowed(parseInt(userId), user.id);
      setIsFollowed(response.isFollowed);
      console.log(response.isFollowed);
    }
    checkIsFollowed();
  }, [user, userId]);

  return (
    <div className='flex flex-col gap-4'>
      <ProfileDetail
        profile={profile}
        className='md:max-w-2xl'
        isFollowed={isFollowed}
      />
      <h3 className='text-xl font-bold ml-4'>Posts</h3>
      <Feed posts={userPosts} />
    </div>
  );
};

Profile.loader = loader;
Profile.action = action;

export default Profile;
