import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <h1 className=' text-2xl font-bold italic'>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
        {error.data && <p>{error.data}</p>}
      </div>
    );
  } else {
    return <div>An unknown error occurred</div>;
  }
};

export default ErrorPage;
