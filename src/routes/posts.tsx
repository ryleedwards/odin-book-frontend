import Feed from '@/components/Feed';
import { useLoaderData, Outlet } from 'react-router';
import { Post as PostType } from '@/types/Post';
import { getPosts } from '@/api/post';

const loader = async () => {
  const posts = await getPosts();
  return posts;
};

const action = async ({ request }: { request: Request }) => {
  return null;
};

const Posts = () => {
  const posts = useLoaderData() as PostType[] | null;

  return (
    <>
      <Feed className='md:max-w-2xl' posts={posts} isFromProfile={false} />
      <Outlet />
    </>
  );
};

Posts.loader = loader;
Posts.action = action;

export default Posts;
