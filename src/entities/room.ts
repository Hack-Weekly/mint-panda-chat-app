import { User } from './user';
import { Message } from './message';
export type Room = {
  id: string;
  name: string;
  users?: User[];
  messages?: Message[];
};
