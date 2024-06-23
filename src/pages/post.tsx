import { getPost } from '@/api/post';
import { LoaderFunction, Params, useLoaderData } from 'react-router';
import { Post as PostType } from '@/types/Post';
import PostModal from '@/components/PostModal';

type LoaderData = {
  post: PostType;
  userId: string;
};

const loader: LoaderFunction = async ({ params }: { params: Params }) => {
  // Add check to determine if we're viewing a profile - need to change
  //   the expand post button link to include /posts

  const { postId, userId } = params;
  try {
    if (!postId) {
      throw new Response('Bad request', { status: 400 });
    }
    const post = await getPost(parseInt(postId));
    if (!post) {
      throw new Response('Post not found', { status: 404 });
    }
    return { post, userId } as LoaderData;
  } catch (e) {
    console.error(e);
    throw new Response('Something went wrong', { status: 500 });
  }
};

const action = async () => {};

const Post = () => {
  const { post, userId } = useLoaderData() as LoaderData;
  return (
    <>
      <PostModal post={post} isFromProfile={userId ? true : false} />
    </>
  );
};

Post.loader = loader;
Post.action = action;

export { Post };
