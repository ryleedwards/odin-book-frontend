import { Post } from '@/types/Post';

type PostModalType = {
  post?: Post;
};

const PostModal = ({ post }: PostModalType) => {
  return (
    <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
      <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
        <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all'>
          <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
            {post?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
