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

const UploadProfilePictureForm = () => {
  const navigate = useNavigate();

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
          <Button
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button type='submit'>Upload</Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default UploadProfilePictureForm;
