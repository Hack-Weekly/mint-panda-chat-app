import { User } from './user';
import { Message } from './message';
// export type Room = {
//   id: string;
//   name: string;
//   users?: User[];
//   messages?: Message[] | [];
// };

export class Room {
  constructor(public id: string, public name: string, public messages: []) {}
}
