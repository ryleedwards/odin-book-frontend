import { Post as PostType } from '@/types/Post';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  differenceInMinutes,
  format,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
} from 'date-fns';
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Link } from 'react-router-dom';

type PostProps = {
  post: PostType;
};

const formatPostDate = (date: Date) => {
  const now = new Date();

  if (differenceInMinutes(now, date) < 1) {
    return 'Just now'; // Post made in the last minute
  } else if (isToday(date)) {
    return format(date, 'p'); // 4:30 PM
  } else if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'p')}`; // Yesterday at 4:30 PM
  } else if (isThisWeek(date, { weekStartsOn: 0 })) {
    // weekStartsOn: 0 for Sunday, 1 for Monday
    return `${format(date, 'EEEE')} at ${format(date, 'p')}`; // Tuesday at 4:30 PM
  } else if (isThisYear(date)) {
    return format(date, 'MMM d'); // Apr 20
  } else {
    return format(date, 'MMM d, yyyy'); // Apr 20, 2023
  }
};

const Post = ({ post }: PostProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md'>
          <div className='flex gap-2 items-center'>
            <Link to={`/users/${post.authorId}`}>
              <Avatar className='bg-gray-300 justify-center items-center'>
                <AvatarImage />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
            </Link>
            <div className='ml-2'>
              <Link to={`/users/${post.authorId}`}>
                <h4 className='font-bold hover:underline'>
                  {post.author.name}
                </h4>
              </Link>
              <p className='text-xs text-muted-foreground'>
                {formatPostDate(new Date(post.createdAt))}
              </p>
            </div>
          </div>
        </CardTitle>
        <CardDescription className='text-xs'></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Post;
