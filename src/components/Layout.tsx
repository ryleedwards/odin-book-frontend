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
      {props.children}
    </>
  );
};

export default Layout;
