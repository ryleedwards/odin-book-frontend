import React from 'react';
import TopNav from './TopNav';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = (props: Props) => {
  const topNavLinks = [{ to: '/', displayName: 'Home' }];
  return (
    <>
      <TopNav links={topNavLinks} />
      <div id='main' className='flex justify-center px-8 py-4'>
        {props.children}
      </div>
    </>
  );
};

export default Layout;
