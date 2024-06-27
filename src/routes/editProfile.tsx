import { fetchUser } from '@/api/user';
import EditProfileForm from '@/components/EditProfileForm';
import ModalWrapper from '@/components/ModalWrapper';
import { LoaderFunction, Params, useLoaderData } from 'react-router';
import { User } from '@/types/User';

const loader: LoaderFunction = async ({
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const { userId } = params;
  if (!userId) {
    throw new Response('Bad request', { status: 400 });
  }
  const user = await fetchUser(parseInt(userId));
  if (!user) {
    throw new Response('User not found', { status: 404 });
  }
  return user;
};

const action = () => {
  return null;
};

const EditProfile = () => {
  const user = useLoaderData() as User;
  console.log(user);
  return (
    <ModalWrapper>
      <EditProfileForm user={user} />
    </ModalWrapper>
  );
};

EditProfile.loader = loader;
EditProfile.action = action;

export default EditProfile;
