import { Room } from './room';
export type User = {
  id: string;
  name: string | null;
  profilePicUrl: string | null;
  rooms?: Room[];
};
