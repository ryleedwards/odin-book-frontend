import Feed from '@/components/Feed';
import { useLoaderData } from 'react-router';
import { Post as PostType } from '@/types/Post';
import CreatePost from '@/components/CreatePost';

const loader = async () => {
  let accessToken = null;
  try {
    accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken}`);
  const getPostsRequest = new Request(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
    { headers: headers }
  );

  const response = await fetch(getPostsRequest);
  if (response.status === 200) {
    const posts = await response.json();
    return posts;
  }
};

const Home = () => {
  const posts = useLoaderData() as PostType[] | null;
  return (
    <>
      <CreatePost className='md:max-w-2xl mb-10' />
      <Feed className='md:max-w-2xl' posts={posts} />
    </>
  );
};

Home.loader = loader;

export default Home;
