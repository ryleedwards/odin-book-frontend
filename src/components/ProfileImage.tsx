import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Avatar, AvatarFallback } from './ui/avatar';
import { FaRegUser } from 'react-icons/fa';

const ProfileImage = ({
  imageId,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  imageId: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  if (!imageId) {
    return (
      <Avatar
        className={`rounded-full h-48 w-48 ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <AvatarFallback className='bg-slate-300'>
          <FaRegUser className='w-24 h-24' />
        </AvatarFallback>
        {children}
      </Avatar>
    );
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });

  const img = cld.image(imageId);
  img.resize(fill().width(250).height(250));

  return (
    <div
      className='rounded-full h-48 w-48'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AdvancedImage cldImg={img} className='rounded-full' />
    </div>
  );
};

export default ProfileImage;
