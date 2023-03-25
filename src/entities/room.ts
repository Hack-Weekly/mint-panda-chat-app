import { Message } from "./message";

export class Room {
  constructor(
    public name: string,
    public messages: Message[],
    public id?: string
  ) {}
}
