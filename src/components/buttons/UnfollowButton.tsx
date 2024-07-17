import { useState } from 'react';
import { Button } from '../ui/button';

interface UnfollowButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
  onClick?: React.MouseEventHandler;
}

const UnfollowButton = ({ className, onClick }: UnfollowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Button
      variant={isHovered ? 'destructive' : 'outline'}
      className={`${className} w-24`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {isHovered ? 'Unfollow' : 'Following'}
    </Button>
  );
};

export default UnfollowButton;
