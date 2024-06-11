const ProfileImage = ({ url }: { url: string }) => {
  return (
    <div className='rounded-full h-48 w-48'>
      <img
        src={
          url
            ? url
            : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
        }
        alt='profile-image'
        className='rounded-full h-full w-full object-cover'
      />
    </div>
  );
};

export default ProfileImage;
