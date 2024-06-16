import { User } from './User';

export interface Like {
  id: number;
  postId: number;
  userId: number;
  createdAt: string;
  user: User;
}
