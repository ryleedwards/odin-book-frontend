import { Form } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import ModalWrapper from './ModalWrapper';

const EditProfileForm = () => {
  return (
    <ModalWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Your name' />
            </div>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant='outline'>Cancel</Button>
          <Button type='submit'>Save</Button>
        </CardFooter>
      </Card>
    </ModalWrapper>
  );
};

export default EditProfileForm;
