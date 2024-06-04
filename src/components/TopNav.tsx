import { NavLink } from 'react-router-dom';
import OdinBookLogo from './OdinbookLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

type Link = {
  to: string;
  displayName: string;
};

type TopNavProps = {
  links: Link[];
};

const TopNav = ({ links }: TopNavProps) => {
  const navLinkStyle = 'text-lg font-bold';
  const isPendingnavLinkStyle = 'text-lg';
  const activeNavLinkStyle = 'text-lg font-bold underline ';

  const signOutClickHandler = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  return (
    <div id='top-nav' className=''>
      <nav className='flex p-2 bg-slate-100 justify-between items-center'>
        <div className='flex gap-4'>
          <OdinBookLogo className='w-12 h-12' />
          <Button className=' bg-slate-200 rounded-full'>
            <FaSearch className='m-1 text-sm'></FaSearch>
          </Button>
        </div>
        <ul>
          <li>
            {links.map((link, i) => {
              return (
                <NavLink
                  key={i}
                  to={link.to}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? activeNavLinkStyle
                      : isPending
                      ? isPendingnavLinkStyle
                      : navLinkStyle
                  }
                >
                  {link.displayName}
                </NavLink>
              );
            })}
          </li>
        </ul>
        <div className='flex gap-4'>
          <Button className='bg-slate-300 rounded-full'>
            <FaBell />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback className='bg-slate-300'>BW</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
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
