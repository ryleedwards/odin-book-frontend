const ProfileImage = ({ url }: { url: string }) => {
  return (
    <div className='rounded-full h-48 w-48'>
      <img
        src={url}
        alt='profile-image'
        className='rounded-full h-full w-full object-cover'
      />
    </div>
  );
};

export default ProfileImage;
