import Feed from '@/components/Feed';
import { useLoaderData, Outlet } from 'react-router';
import { Post as PostType } from '@/types/Post';
import { deleteLike, getPosts } from '@/api/post';
import { createLike } from '@/api/post';

const loader = async () => {
  const posts = await getPosts();
  return posts;
};

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  if (formData.has('liked') && formData.has('postId')) {
    const liked = formData.get('liked') === 'true';
    const postId = parseInt(formData.get('postId') as string);
    liked ? await deleteLike(postId) : await createLike(postId);
  }
  return { ok: true };
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
