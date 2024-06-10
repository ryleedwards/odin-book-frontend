import { Post as PostType } from '@/types/Post';
import UserAvatar from './UserAvatar';

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  return (
    <div className='flex flex-col gap-2 px-4 py-6 bg-slate-300 rounded-sm'>
      <div className='flex gap-2 items-center'>
        <UserAvatar user={post.author} />
        <h4 className='font-bold'>{post.author.name}</h4>
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
