import { Post as PostType } from '../types/Post';
import Post from './Post';

type FeedProps = {
  className?: string;
  children?: React.ReactNode;
  posts: PostType[] | null;
};

const Feed = ({ className, posts }: FeedProps) => {
  console.log(posts);
  return (
    <div className={`${className} bg-slate-500 w-full flex flex-col gap-2`}>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
