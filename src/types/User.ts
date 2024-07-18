import { Profile } from './Profile';
import { Follower } from './Follower';

export interface User {
  id: number;
  name: string;
  profile: Profile;
  followers?: Follower[];
}
