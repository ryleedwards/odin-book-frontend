import { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { Post as PostType } from '../types/Post';
import { authProvider } from '@/auth/auth';
import { createLike, deleteLike } from '@/api/post';

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

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await deleteLike(post.id);
        setIsLiked(false);
      } else {
        await createLike(post.id);
        setIsLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='cursor-pointer'
      onClick={handleLikeClick}
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
