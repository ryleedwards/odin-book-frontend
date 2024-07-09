import { Comment } from '@/types/Comment';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Link } from 'react-router-dom';
import CldImage from './CldImage';

type CommentDisplayProps = {
  comment: Comment;
  className?: string;
};

export const CommentDisplay = ({ comment, className }: CommentDisplayProps) => {
  return (
    <div className={`${className} flex items-center gap-2`}>
      <div>
        <Link to={`/users/${comment.authorId}`}>
          <Avatar>
            {comment.author.profile.image ? (
              <CldImage publicId={comment.author.profile.image} />
            ) : (
              <AvatarFallback className='font-semibold bg-slate-300'>
                {comment.author.name[0]}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      </div>
      <div className='flex flex-col bg-slate-100 py-2 px-4 rounded-md'>
        <Link to={`/users/${comment.authorId}`}>
          <p className='text-sm font-bold hover:underline'>
            {comment.author.name}
          </p>
        </Link>

        <p className='text-xs'>{comment.content}</p>
      </div>
    </div>
  );
};
