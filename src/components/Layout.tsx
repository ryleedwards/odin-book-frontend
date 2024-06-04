import React from 'react';
import TopNav from './TopNav';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = (props: Props) => {
  const topNavLinks = [{ to: '/', displayName: 'Home' }];
  return (
    <div>
      <TopNav links={topNavLinks} />
      <h1>Layout</h1>
      {props.children}
    </div>
  );
};

export default Layout;
