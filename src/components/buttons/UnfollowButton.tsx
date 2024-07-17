import { Button } from '../ui/button';

type UnfollowButtonProps = {
  className?: string;
};

const UnfollowButton = ({ className }: UnfollowButtonProps) => {
  return (
    <Button variant={'outline'} className={className}>
      Following
    </Button>
  );
};

export default UnfollowButton;
