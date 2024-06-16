import { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { Post as PostType } from '../types/Post';
import { authProvider } from '@/auth/auth';

type LikeButtonProps = {
  post: PostType;
};

const LikeButton = ({ post }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (post.likes.some((like) => like.userId === authProvider.user?.id)) {
      setIsLiked(true);
    }
  }, [post]);
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
    >
      {isLiked && isHovered ? (
        <FaHeartBroken className='text-red-700' />
      ) : isLiked && !isHovered ? (
        <FaHeart className='text-red-500' />
      ) : !isLiked && isHovered ? (
        <FaHeart className='text-red-500' />
      ) : !isLiked && !isHovered ? (
        <FaRegHeart />
      ) : null}
    </button>
  );
};

export default LikeButton;
