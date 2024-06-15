import { User } from './User';
import { Like } from './Like';

export interface Post {
  id: number;
  createdAt: string;
  content: string;
  authorId: number;
  author: User;
  likes: Like[];
}

export type PostFormErrors = {
  content?: string;
};
