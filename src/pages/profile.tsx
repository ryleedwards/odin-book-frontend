import { useParams } from 'react-router';

const loader = async () => {
  return null;
};

const Profile = () => {
  const { userId } = useParams();
  return <div>{userId ?? userId}</div>;
};

Profile.loader = loader;

export default Profile;
