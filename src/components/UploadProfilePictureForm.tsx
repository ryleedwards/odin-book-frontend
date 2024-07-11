import { Form, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

const UploadProfilePictureForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  return (
    <Form
      id='upload-profile-picture'
      method='post'
      encType='multipart/form-data'
    >
      <Card>
        <CardHeader>
          <CardTitle>Upload Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type='file'
            id='profile-picture'
            name='profile_picture'
            multiple={false}
          />
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type='submit'>Upload</Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default UploadProfilePictureForm;
