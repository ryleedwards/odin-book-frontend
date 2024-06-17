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
  const likedByList = (
    <ul>
      {post.likes.map((like) => (
        <li key={like.id}>{like.user.name}</li>
      ))}
    </ul>
  );

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
