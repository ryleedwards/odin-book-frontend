import { Post as PostType } from '@/types/Post';
import Post from './Post';
import ModalWrapper from './ModalWrapper';

type PostModalType = {
  post: PostType;
  isFromProfile: boolean;
};

const PostModal = ({ post, isFromProfile }: PostModalType) => {
  return (
    <ModalWrapper>
      <Post
        post={post}
        isFromProfile={isFromProfile}
        showCommentForm={true}
        isModal={true}
      />
    </ModalWrapper>
  );
};

export default PostModal;
