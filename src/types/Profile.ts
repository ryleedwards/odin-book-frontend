import { User } from './User';

export interface Profile {
  id: number;
  createdAt: Date;
  image: string;
  about: string;
  userId: number;
  user: User;
}
