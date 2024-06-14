import Feed from '@/components/Feed';
import { redirect, useLoaderData } from 'react-router';
import { PostFormErrors, Post as PostType } from '@/types/Post';
import CreatePost from '@/components/CreatePost';
import { getPosts, createPost } from '@/api/post';

const loader = async () => {
  const posts = await getPosts();
  return posts;
};

const action = async ({ request }: { request: Request }) => {
  const errors = {} as PostFormErrors;
  const formData = await request.formData();
  const content = formData.get('content') as string;

  // Validate content
  if (typeof content !== 'string' || content.length === 0) {
    errors.content = 'Please add text to your post';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const post = await createPost(content);
  return redirect('/');
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
