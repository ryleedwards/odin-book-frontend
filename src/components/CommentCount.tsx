import { FaRegComment } from 'react-icons/fa';

export const CommentCount = ({ count }: { count: number }) => {
  return (
    <div className='flex items-center gap-1'>
      <FaRegComment />
      <span className='text-sm text-gray-500'>{count}</span>
    </div>
  );
};
