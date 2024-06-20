import { User } from './User';
import { Like } from './Like';
import { Comment } from './Comment';

export interface Post {
  id: number;
  createdAt: string;
  content: string;
  authorId: number;
  author: User;
  likes: Like[];
  comments: Comment[];
}

export type PostFormErrors = {
  content?: string;
};
