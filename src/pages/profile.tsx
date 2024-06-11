import { LoaderFunction, Params, useLoaderData } from 'react-router';
import { fetchProfile } from '@/api/profile';
import { Profile as ProfileType } from '@/types/Profile';
import { ProfileDetail } from '@/components/ProfileDetail';

const loader: LoaderFunction = async ({ params }: { params: Params }) => {
  const { userId } = params;
  try {
    if (!userId) {
      throw new Response('Bad request', { status: 401 });
    }
    const profile = await fetchProfile(userId);
    return profile;
  } catch (e) {
    throw new Response('Profile not found', { status: 404 });
  }
};

const Profile = () => {
  const profile = useLoaderData() as ProfileType | null;
  return (
    <>
      <ProfileDetail profile={profile} className='md:max-w-2xl' />
    </>
  );
};

Profile.loader = loader;

export default Profile;
