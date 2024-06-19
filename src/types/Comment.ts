import { User } from './User';
export interface Comment {
  id: number;
  authorId: number;
  author: User;
  postId: number;
  content: string;
}
