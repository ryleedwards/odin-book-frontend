import { LoaderFunctionArgs, useLoaderData } from 'react-router';
import { getPost } from '@/api/post';
import { Post as PostType } from '@/types/Post';
import PostModal from '@/components/PostModal';

async function loader({ params }: LoaderFunctionArgs) {
  const { postId } = params;
  if (!postId) {
    throw new Response('Bad request', { status: 400 });
  }
  const post = await getPost(parseInt(postId));
  if (!post) {
    throw new Response('Post not found', { status: 404 });
  }
  return post;
}

const Post = () => {
  const post = useLoaderData() as PostType;
  return <PostModal post={post} />;
};

Post.loader = loader;

export default Post;
