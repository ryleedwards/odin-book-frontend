import { Button } from '../ui/button';

interface FollowButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
  onClick?: React.MouseEventHandler;
}

const FollowButton = ({ className, onClick }: FollowButtonProps) => {
  return (
    <Button
      className={`bg-blue-500 hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
