import { LoaderFunction, Params, useLoaderData } from 'react-router';
import { fetchProfile, fetchUserPosts } from '@/api/profile';
import { Profile as ProfileType } from '@/types/Profile';
import { ProfileDetail } from '@/components/ProfileDetail';
import Feed from '@/components/Feed';
import { Post } from '@/types/Post';

type LoaderData = {
  profile: ProfileType;
  userPosts: Post[];
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
    return { profile, userPosts } as LoaderData;
  } catch (e) {
    throw new Response('Profile not found', { status: 404 });
  }
};

const Profile = () => {
  const { profile, userPosts } = useLoaderData() as LoaderData;
  console.log(profile);
  console.log(userPosts);
  return (
    <div className='flex flex-col gap-4'>
      <ProfileDetail profile={profile} className='md:max-w-2xl' />
      <h3 className='text-xl font-bold ml-4'>Posts</h3>
      <Feed posts={userPosts} />
    </div>
  );
};

Profile.loader = loader;

export default Profile;
