import { authProvider } from '@/auth/auth';
import { Post } from '@/types/Post';
import React, { useState } from 'react';
import { useFetcher } from 'react-router-dom';

type LikeButtonProps = {
  post: Post;
};

const LikeButton = ({ post }: LikeButtonProps) => {
  const fetcher = useFetcher();

  // if there is 'formData' then it is posting to the action
  const liked = post.likes.some(
    (like) => like.userId === authProvider.user?.id
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='cursor-pointer'
      onClick={() =>
        fetcher.submit({ postId: post.id, liked: liked }, { method: 'post' })
      }
      name='liked'
      value={liked ? 'true' : 'false'}
    >
      Like
    </button>
  );
};

export default LikeButton;
