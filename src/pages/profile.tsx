import { LoaderFunction, Params, useLoaderData } from 'react-router';
import { fetchProfile } from '@/api/profile';
import { Profile as ProfileType } from '@/types/Profile';

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
  console.log(profile);
  return <div>{profile?.user.name}</div>;
};

Profile.loader = loader;

export default Profile;
