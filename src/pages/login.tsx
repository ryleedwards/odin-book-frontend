import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
  redirect,
} from 'react-router-dom';
import FormInput from '../components/FormInput';
import { FormButton } from '../components/FormButton';
import { authProvider } from '../auth/auth';

type FormErrors = {
  auth?: string;
  email?: string;
  password?: string;
};

export const loader = async () => {
  // Check local storage for access token
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const status: boolean | undefined = await authProvider.getStatus(
      accessToken
    );
    if (status) {
      return redirect('/');
    }
  }
  return null;
};

export const action = async ({ request }: { request: Request }) => {
  const form = await request.formData();
  const email = form.get('email') as string;
  const password = form.get('password') as string;
  const errors: FormErrors = {};

  // Validate fields
  if (typeof email !== 'string' || email.length === 0) {
    errors.email = 'Email is required';
  }

  if (typeof password !== 'string' || password.length === 0) {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // Validation complete

  // Attempt login with backend

  const successfulLogin: boolean = await authProvider.signin(email, password);

  if (!successfulLogin) {
    errors.auth = 'Invalid email or password';
    return errors;
  } else {
    return redirect('/');
  }

  return null;
};

const LoginPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('email') != null;

  const errors = useActionData() as FormErrors | null;

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
          {errors?.auth && <p className='text-red-400'>{errors.auth}</p>}
          <FormInput
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            autoComplete='email'
          />
          {errors?.email && <p className='text-red-400'>{errors.email}</p>}
          <FormInput
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='current-password'
          />
          {errors?.password && (
            <p className='text-red-400'>{errors.password}</p>
          )}
          <FormButton type='submit' disabled={isLoggingIn}>
            Sign in
          </FormButton>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
