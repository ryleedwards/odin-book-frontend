import { Post as PostType } from '@/types/Post';

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  return (
    <div className='flex flex-col gap-2 p-4 bg-slate-300'>
      <h1>{post.authorId}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
