import { DocumentData } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getRoomById } from '../../api/rooms';
import { getMessages } from '../../api/messages';
import MessageInput from '../messages/MessageInput';
import { Message } from '../../entities/message';

const RoomPage = () => {
  const [room, setRoom] = useState<DocumentData | undefined>({});
  const [messages, setMessages] = useState<[]>();
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
        await getMessages(id, (messages: any) => {
          setMessages(messages);
        });
      }
    };
    getAllMessages();
  }, []);

  if (room && room.name && messages && id) {
    return (
      <div>
        <h2>{room.name}</h2>
        <div>
          {messages.map((message: any) => {
            return <div key={message.id}>{message.text}</div>;
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
