import { Link, NavLink, useRouteLoaderData } from 'react-router-dom';
import OdinBookLogo from './OdinbookLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { FaSearch, FaBell } from 'react-icons/fa';

import Button from './Button';
import { User } from '@/auth/auth';
import UserAvatar from './UserAvatar';

type Link = {
  to: string;
  inactiveElement: JSX.Element;
  activeElement: JSX.Element;
};

type TopNavProps = {
  links: Link[];
};

const TopNav = ({ links }: TopNavProps) => {
  const { user } = useRouteLoaderData('root') as { user: User | null };

  const signOutClickHandler = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  return (
    <div id='top-nav' className=''>
      <nav className='flex p-2  justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <Link to={'/posts'}>
            <OdinBookLogo className='w-12 h-12' />
          </Link>

          <Button className=' bg-slate-200 hover:bg-slate-300 rounded-full w-10 h-10'>
            <FaSearch className='text-sm'></FaSearch>
          </Button>
        </div>
        <ul className='flex gap-4 items-center'>
          {links.map((link, i) => {
            return (
              <li key={i}>
                <NavLink to={link.to}>
                  {({ isActive }) =>
                    isActive ? link.activeElement : link.inactiveElement
                  }
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className='flex gap-4 items-center '>
          <Button className='bg-slate-200 hover:bg-slate-300 rounded-full h-10 w-10 flex justify-center items-center'>
            <FaBell />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user ? user.name : ''}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={`/users/${user?.id}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={signOutClickHandler}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
