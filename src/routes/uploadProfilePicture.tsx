import { updateProfilePicture } from '@/api/profilePicture';
import { fetchUser } from '@/api/user';
import ModalWrapper from '@/components/ModalWrapper';
import UploadProfilePictureForm from '@/components/UploadProfilePictureForm';
import { LoaderFunction, Params, redirect } from 'react-router';

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
  const success = await updateProfilePicture(formData);
  console.log(success);

  if (!success) {
    return { ok: false };
  } else {
    return redirect(`/users/${userId}`);
  }
};

const UploadProfilePicture = () => {
  return (
    <ModalWrapper>
      <UploadProfilePictureForm />
    </ModalWrapper>
  );
};

UploadProfilePicture.loader = loader;
UploadProfilePicture.action = action;

export default UploadProfilePicture;
