import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
} from 'react-router-dom';
import FormInput from '../components/FormInput';
import { FormButton } from '../components/FormButton';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  console.log(email, password);
  return { email, password };
};

const LoginPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('email') != null;

  const actionData = useActionData() as { error: string } | undefined;

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
          <input type='hidden' name='redirectTo' value={from} />
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
          <FormButton type='submit' disabled={isLoggingIn}>
            Sign in
          </FormButton>
          {actionData && actionData.error ? (
            <p className='text-red-500'>{actionData.error}</p>
          ) : null}
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
