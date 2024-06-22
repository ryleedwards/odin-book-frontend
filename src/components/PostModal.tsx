import { Post as PostType } from '@/types/Post';
import Post from './Post';
import ModalWrapper from './ModalWrapper';

type PostModalType = {
  post: PostType;
};

const PostModal = ({ post }: PostModalType) => {
  return (
    <ModalWrapper>
      <Post post={post} />
    </ModalWrapper>
  );
};

export default PostModal;
