import React from 'react';
import TopNav from './TopNav';
import { IoHomeOutline, IoHome, IoPeople } from 'react-icons/io5';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = (props: Props) => {
  const topNavLinks = [
    {
      // Home feed
      to: '/posts',
      inactiveElement: <IoHomeOutline className='w-8 h-8' />,
      activeElement: <IoHome className='w-8 h-8 text-blue-600' />,
    },
    {
      // Users index page
      to: '/users/browse',
      inactiveElement: <IoPeople className='w-8 h-8' />,
      activeElement: <IoPeople className='w-8 h-8 text-blue-600' />,
    },
  ];
  return (
    <>
      <TopNav links={topNavLinks} />
      <div
        id='main'
        className='flex flex-col items-center px-8 py-4 bg-slate-100'
      >
        {props.children}
      </div>
    </>
  );
};

export default Layout;
