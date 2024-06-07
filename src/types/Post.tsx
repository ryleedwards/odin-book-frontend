import { User } from './User';

export interface Post {
  id: number;
  createdAt: string;
  content: string;
  authorId: string;
  author: User;
}
