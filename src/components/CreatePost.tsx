import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Form } from 'react-router-dom';

type CreatePostProps = {
  className?: string;
};

const CreatePost = ({ className }: CreatePostProps) => {
  return (
    <Card className={`${className} w-full`}>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Textarea id='content' placeholder={`What's on your mind?`} />
            </div>
          </div>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button className='bg-blue-500 hover:bg-blue-600'>Post</Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
