import { Post } from '../types/Post';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

type LikeCountProps = {
  post: Post;
  likeCount: number;
  className?: string;
};

export const LikeCount = ({ post, className, likeCount }: LikeCountProps) => {
  let likedByList = null;
  if (post.likes.length === 0) {
    likedByList = 'Be the first to like this post!';
  }
  if (post.likes.length > 0 && post.likes.length < 4) {
    likedByList = (
      <ul>
        {post.likes.map((like) => (
          <li key={like.id}>{like.user.name}</li>
        ))}
      </ul>
    );
  } else if (post.likes.length >= 4) {
    likedByList = (
      <ul>
        {post.likes.slice(0, 3).map((like) => (
          <li key={like.id}>{like.user.name}</li>
        ))}
        <li className='italic'>and {post.likes.length - 3} others</li>
      </ul>
    );
  }
  return (
    <div className={className}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p>{likeCount}</p>
          </TooltipTrigger>
          <TooltipContent>{likedByList}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
