import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Avatar, AvatarFallback } from './ui/avatar';

const ProfileImage = ({ imageId }: { imageId: string }) => {
  if (!imageId) {
    return (
      <Avatar className='rounded-full h-48 w-48'>
        <AvatarFallback className='bg-slate-300' />
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
    <div className='rounded-full h-48 w-48'>
      <AdvancedImage cldImg={img} className='rounded-full' />
    </div>
  );
};

export default ProfileImage;
