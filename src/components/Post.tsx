import { Post as PostType } from '@/types/Post';
import UserSmall from './UserSmall';

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  return (
    <div className='flex flex-col gap-2 px-4 py-6 rounded-sm bg-white'>
      <UserSmall user={post.author} />
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
