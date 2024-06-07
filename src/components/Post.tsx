import { User } from '@/types/User';

type PostProps = {
  id: string;
  author: User;
};

const Post = (props: PostProps) => {
  return <div>Post</div>;
};

export default Post;
