import Feed from '@/components/Feed';
import { useLoaderData, Outlet, useLocation } from 'react-router';
import { Post as PostType } from '@/types/Post';
import { deleteLike, getPosts } from '@/api/post';
import { createLike } from '@/api/post';
import { NavLink } from 'react-router-dom';

const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const view = url.searchParams.get('view');
  const posts = await getPosts(view);
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
  const feedSelectorStyle = 'w-full h-full py-4 text-center';
  const { search } = useLocation();
  const view = new URLSearchParams(search).get('view');

  return (
    <>
      <div className='  md:max-w-2xl flex mb-2 rounded-md text-lg justify-center w-full shadow-sm'>
        <NavLink
          to={'/posts?view=following'}
          className={({ isActive }) =>
            isActive && view === 'following'
              ? `${feedSelectorStyle} bg-blue-700 text-white rounded-l-md font-bold`
              : `${feedSelectorStyle} rounded-l-md bg-slate-300 hover:bg-slate-400 font-semibold`
          }
        >
          Following
        </NavLink>
        <NavLink
          to={'/posts?view=all'}
          className={({ isActive }) =>
            isActive && view === 'all'
              ? `${feedSelectorStyle} bg-blue-700 text-white rounded-r-md font-bold`
              : `${feedSelectorStyle} rounded-r-md bg-slate-300 hover:bg-slate-400 font-semibold`
          }
        >
          All
        </NavLink>
      </div>
      <Feed className='md:max-w-2xl' posts={posts} isFromProfile={false} />
      <Outlet />
    </>
  );
};

Posts.loader = loader;
Posts.action = action;

export default Posts;
