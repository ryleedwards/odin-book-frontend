import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { User } from '@/types/User';

type UserAvatarProps = {
  user: User;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <>
      <Avatar>
        <AvatarImage />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
    </>
  );
};

export default UserAvatar;
