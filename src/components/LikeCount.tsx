import { Post } from '../types/Post';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

type LikeCountProps = {
  post: Post;
  className?: string;
};

export const LikeCount = ({ post, className }: LikeCountProps) => {
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
            <p>{post.likes.length}</p>
          </TooltipTrigger>
          <TooltipContent>{likedByList}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
