import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaHeartBroken } from 'react-icons/fa';

type LikeButtonProps = {
  isLiked: boolean;
  handleClick: () => void;
};

const LikeButton = ({ isLiked, handleClick }: LikeButtonProps) => {
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
      onClick={handleClick}
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
