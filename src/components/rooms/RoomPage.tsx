import { DocumentData } from "@firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";

import { getRoomById } from "../../api/rooms";
import { getMessages } from "../../api/messages";
import MessageInput from "../conversations/MessageInput";
import { Message } from "../../entities/message";
import classes from "./RoomPage.module.css";

import RoomChatBubble from "./RoomChatBubble";

const RoomPage = () => {
  const [room, setRoom] = useState<DocumentData | undefined>({});
  const [messages, setMessages] = useState<Message[]>();
  const { id } = useParams();
  const container = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    container.current?.scrollIntoView({ block: 'end',  behavior: 'smooth' });
  }, [messages])

  if (room && room.name && messages && id) {
    return (
      <div className={classes.roomsPage}>
        <h2>{room.name}</h2>
        <div ref={container}>
          {messages.map((message: Message) => {
            return (
              <div key={message.id}>
                <RoomChatBubble
                  text={message.text}
                  user_id={message.user_id}
                  created_at={message.created_at}
                  file_content={message.file_content}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.fixed}>
          <MessageInput roomId={id} />
        </div>
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
