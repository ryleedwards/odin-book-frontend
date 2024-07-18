import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { FaEdit } from 'react-icons/fa';

interface EditProfilePictureButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const EditProfilePictureButton = ({
  className,
}: EditProfilePictureButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      className={`${className}  rounded-full bg-blue-600 hover:bg-blue-700 text-white mb-4 h-10 w-10 absolute`}
      onClick={() => navigate('upload-profile-picture')}
    >
      <div>
        <FaEdit />
      </div>
    </Button>
  );
};

export default EditProfilePictureButton;
