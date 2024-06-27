import { Form, useNavigate } from 'react-router-dom';
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
import { Textarea } from './ui/textarea';
import { User as UserType } from '@/types/User';
import { useState } from 'react';

type EditProfileFormProps = {
  user: UserType;
};

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState(user.profile.about);

  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col space-y-1.5 pt-4'>
            <Label htmlFor='about'>About</Label>
            <Textarea
              id='about'
              placeholder='Tell us a little about yourself'
              value={user.profile.about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className='flex flex-col space-y-1.5 pt-4'>
            <Label htmlFor='profile-picture'>Profile Picture</Label>
            <Input id='profile-picture' type='file' />
          </div>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type='submit'>Save</Button>
      </CardFooter>
    </Card>
  );
};

export default EditProfileForm;
