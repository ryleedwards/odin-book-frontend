import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id='error-page'>
      <h1 className='text-3xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {isRouteErrorResponse(error) ? error.statusText : 'Unexpected error.'}
      </p>
    </div>
  );
};

export default ErrorPage;
