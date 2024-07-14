import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { AdvancedImage, placeholder } from '@cloudinary/react';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

const CldImage = ({ publicId }: { publicId: string }) => {
  const myImage = cld
    .image(publicId)
    .resize(thumbnail().width(300).height(300).gravity(autoGravity()))
    .delivery(format('auto'))
    .delivery(quality('auto'));
  return (
    <AdvancedImage
      cldImg={myImage}
      style={{ maxWidth: '100%' }}
      plugins={[placeholder()]}
    />
  );
};
export default CldImage;
