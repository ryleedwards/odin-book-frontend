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
import LikeButton from './LikeButton';
import { LikeCount } from './LikeCount';
import { useEffect, useState } from 'react';
import { authProvider } from '@/auth/auth';
import { createLike, deleteLike } from '@/api/post';
import { CommentCount } from './CommentCount';
import { CommentDisplay } from './CommentDisplay';
import { Separator } from './ui/separator';

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
  console.log(post);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  // determines if post is liked by current user
  useEffect(() => {
    if (post.likes.some((like) => like.userId === authProvider.user?.id)) {
      setIsLiked(true);
    }
  }, [post]);

  // determines if post is currently liked, submits opposite to post api
  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await deleteLike(post.id);
        setIsLiked(false);
        setLikeCount((likeCount) => likeCount - 1);
      } else {
        await createLike(post.id);
        setIsLiked(true);
        setLikeCount((likeCount) => likeCount + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <CardFooter>
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex gap-4'>
            <div className='flex gap-2 items-center'>
              <LikeButton isLiked={isLiked} handleClick={handleLikeClick} />
              <LikeCount
                post={post}
                likeCount={likeCount}
                className='hover:underline cursor-pointer text-gray-500 text-sm'
              />
            </div>
            <CommentCount count={post.comments.length} />
          </div>
          {post.comments.length > 0 && (
            <>
              <Separator />
              <CommentDisplay comment={post.comments[0]} className='pl-4' />
            </>
          )}
          {post.comments.length > 1 && <p>View more comments</p>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
