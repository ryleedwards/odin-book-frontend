import { fetchUser, updateUser } from '@/api/user';
import EditProfileForm from '@/components/EditProfileForm';
import ModalWrapper from '@/components/ModalWrapper';
import { LoaderFunction, Params, redirect, useLoaderData } from 'react-router';
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

const action = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const userId = parseInt(params.userId as string);
  if (!userId) {
    throw new Response('Bad request', { status: 400 });
  }
  const formData = await request.formData();
  const success = await updateUser(userId, formData);

  if (!success) {
    return { ok: false };
  } else {
    return redirect(`/users/${userId}`);
  }
};

const EditProfile = () => {
  const user = useLoaderData() as User;
  return (
    <ModalWrapper>
      <EditProfileForm user={user} />
    </ModalWrapper>
  );
};

EditProfile.loader = loader;
EditProfile.action = action;

export default EditProfile;
