import React from 'react';
import Button from './Button';
import TopNav from './TopNav';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = (props: Props) => {
  const signOutClickHandler = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };
  const topNavLinks = [{ to: '/', displayName: 'Home' }];
  return (
    <div>
      <TopNav links={topNavLinks} />
      <h1>Layout</h1>
      {props.children}
      <Button
        id='sign-out'
        className='bg-indigo-800 text-white hover:bg-indigo-600'
        onClick={signOutClickHandler}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Layout;
