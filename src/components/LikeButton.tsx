import { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

type LikeButtonProps = {
  isLiked: boolean;
};

const LikeButton = ({ isLiked }: LikeButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='cursor-pointer'
    >
      {isLiked ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
      {isHovered ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
    </div>
  );
};

export default LikeButton;
