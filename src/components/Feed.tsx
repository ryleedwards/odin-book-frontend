import { Post as PostType } from '../types/Post';
import Post from './Post';

type FeedProps = {
  className?: string;
  children?: React.ReactNode;
  posts: PostType[] | null;
  isFromProfile: boolean;
};

const Feed = ({ className, posts, isFromProfile }: FeedProps) => {
  return (
    <div id='feed' className={`${className} w-full flex flex-col gap-2`}>
      {posts?.map((post) => (
        <Post
          key={post.id}
          post={post}
          isFromProfile={isFromProfile}
          showCommentForm={false}
        />
      ))}
    </div>
  );
};

export default Feed;
