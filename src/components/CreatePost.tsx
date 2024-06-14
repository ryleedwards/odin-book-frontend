import { PostFormErrors } from '@/types/Post';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Textarea } from './ui/textarea';
import { Form, useActionData, useNavigation } from 'react-router-dom';

type CreatePostProps = {
  className?: string;
};

const CreatePost = ({ className }: CreatePostProps) => {
  const errors = useActionData() as PostFormErrors | null;
  const navigation = useNavigation();
  const btnText = navigation.state === 'submitting' ? 'Posting...' : 'Post';
  return (
    <Card className={`${className} w-full`}>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form id='create-post-form' method='post' action=''>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Textarea
                id='content'
                name='content'
                placeholder={`What's on your mind?`}
                disabled={navigation.state === 'submitting'}
              />
            </div>
            {errors?.content && (
              <p className='text-red-400'>{errors.content}</p>
            )}
          </div>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          form='create-post-form'
          className='bg-blue-500 hover:bg-blue-600'
        >
          {btnText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
