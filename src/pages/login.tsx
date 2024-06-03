import { Form } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { FormButton } from '../components/FormButton';

const LoginPage = () => {
  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900'>
          Welcome to Odinbook
        </h2>
        <h3 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h3>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form method='post' replace className='space-y-6 '>
          <FormInput
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            autoComplete='email'
          />
          <FormInput
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='current-password'
          />
          <FormButton>Sign in</FormButton>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
