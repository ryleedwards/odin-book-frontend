import Feed from '@/components/Feed';
import { useLoaderData } from 'react-router';
import { Post as PostType } from '@/types/Post';
import CreatePost from '@/components/CreatePost';
import { getPosts, createPost } from '@/api/post';

const loader = async () => {
  const posts = await getPosts();
  return posts;
};

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const content = formData.get('content') as string;
  const post = await createPost(content);
  console.log(post);
  return { post };
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
Home.action = action;

export default Home;
