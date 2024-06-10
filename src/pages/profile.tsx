import { useParams, LoaderFunction, Params } from 'react-router';
import { fetchProfile } from '@/api/profile';

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
  const { userId } = useParams();
  return <div>{userId ?? userId}</div>;
};

Profile.loader = loader;

export default Profile;
