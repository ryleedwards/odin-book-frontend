import { ScrollArea } from './ui/scroll-area';
import { CommentDisplay } from './CommentDisplay';
import { Comment } from '@/types/Comment';

type CommentScrollAreaProps = {
  comments: Comment[];
  className?: string;
};

const CommentScrollArea = ({ comments, className }: CommentScrollAreaProps) => {
  return (
    <ScrollArea id='comment-scroll-area' className={`${className}`}>
      {comments.map((comment) => {
        return (
          <CommentDisplay key={comment.id} comment={comment} className='my-2' />
        );
      })}
    </ScrollArea>
  );
};

export default CommentScrollArea;
