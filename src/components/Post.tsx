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
import { Form, Link, useNavigate, useSearchParams } from 'react-router-dom';
import LikeButton from './LikeButton';
import { LikeCount } from './LikeCount';
import { CommentCount } from './CommentCount';
import { CommentDisplay } from './CommentDisplay';
import { Separator } from './ui/separator';
import { FaExpandAlt } from 'react-icons/fa';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IoMdSend } from 'react-icons/io';
import { FaXmark } from 'react-icons/fa6';
import CommentScrollArea from './CommentScrollArea';

type PostProps = {
  post: PostType;
  isFromProfile?: boolean;
  showCommentForm: boolean;
  isModal?: boolean;
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

const Post = ({ post, isFromProfile, showCommentForm, isModal }: PostProps) => {
  // Gather searchParams to pass into expandURL to preserve page state in modal view
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  // expandURL used to preserve page state in modal view
  const expandURL = isFromProfile
    ? `posts/${post.id}?${searchParams.toString()}`
    : `${post.id}?${searchParams.toString()}`;
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md'>
          <div className='flex justify-between'>
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
            {isModal ? (
              <button
                onClick={() => navigate(-1)}
                className='absolute right-8 top-8 rounded-full text-gray-500 hover:text-gray-800 p-2'
              >
                <FaXmark />
              </button>
            ) : (
              <Link to={expandURL} preventScrollReset={true}>
                <FaExpandAlt className='text-xl text-gray-500 hover:text-gray-800' />
              </Link>
            )}
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
              <LikeButton post={post} />
              <LikeCount
                post={post}
                likeCount={post.likes.length}
                className='hover:underline cursor-pointer text-gray-500 text-sm'
              />
            </div>
            <CommentCount count={post.comments.length} />
          </div>
          {isModal
            ? post.comments.length > 0 && (
                <>
                  <Separator className='' />
                  <CommentScrollArea
                    comments={post.comments}
                    className='h-72'
                  />
                </>
              )
            : // Show comments preview -- i.e. only the first comment
              post.comments.length > 0 && (
                <div className='flex flex-col gap-4'>
                  <>
                    <Separator />
                    <CommentDisplay
                      comment={post.comments[0]}
                      className='pl-4'
                    />

                    {post.comments.length > 1 && (
                      <Link
                        to={expandURL}
                        preventScrollReset={true}
                        className='text-sm hover:underline cursor-pointer'
                      >
                        View more comments
                      </Link>
                    )}
                  </>
                </div>
              )}
          {showCommentForm && (
            <Form method='post' className='flex'>
              <Input placeholder='Add a comment' name='content' />
              <Button className='ml-2' type='submit' name='create-comment'>
                <IoMdSend />
              </Button>
            </Form>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
