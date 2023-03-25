import { DocumentData } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getRoomById } from "../../api/rooms";
import { getMessages } from "../../api/messages";
import MessageInput from "../messages/MessageInput";
import { Message } from "../../entities/message";

import RoomChatBubble from "./RoomChatBubble";

const RoomPage = () => {
  const [room, setRoom] = useState<DocumentData | undefined>({});
  const [messages, setMessages] = useState<Message[]>();
  const { id } = useParams();

  useEffect(() => {
    const getRoom = async () => {
      if (id) {
        const room = await getRoomById(id);
        setRoom(room);
      }
    };
    getRoom();
  }, []);

  useEffect(() => {
    const getAllMessages = async () => {
      if (id) {
        getMessages(id, (messages: Message[]) => {
          setMessages(messages);
        });
      }
    };
    getAllMessages();
  }, []);

  console.log("room: " + room);
  console.log("messages: " + messages);

  if (room && room.name && messages && id) {
    return (
      <div>
        <h2>{room.name}</h2>
        <div>
          {messages.map((message: Message) => {
            return (
              <div key={message.id}>
                <RoomChatBubble
                  text={message.text}
                  user_id={message.user_id}
                  created_at={message.created_at}
                />
              </div>
            );
          })}
        </div>
        <MessageInput roomId={id} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>That room doesn't exist!</h2>
      </div>
    );
  }
};

export default RoomPage;
