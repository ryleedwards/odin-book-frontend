import EditProfileForm from '@/components/EditProfileForm';
import ModalWrapper from '@/components/ModalWrapper';

const loader = () => {
  console.log('loader here');
  return null;
};

const action = () => {
  return null;
};

const EditProfile = () => {
  return (
    <ModalWrapper>
      <EditProfileForm />
    </ModalWrapper>
  );
};

EditProfile.loader = loader;
EditProfile.action = action;

export default EditProfile;
