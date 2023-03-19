import { Room } from './room';
export type User = {
  uid: string;
  name: string | null;
  authProvider: 'google';
  email: string;
  profilePicUrl: string | null;
  rooms?: Room[];
};
