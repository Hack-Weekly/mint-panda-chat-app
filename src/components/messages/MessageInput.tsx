import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../api/firebase';
import { Message } from '../../entities/message';
import { sendMessage } from '../../api/messages';

interface MessageInputProps {
  roomId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ roomId }) => {
  const [messageText, setMessageText] = useState('');

  const [user] = useAuthState(auth);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const messageToSend: Message = {
      created_at: new Date().toISOString(),
      text: messageText,
      user_id: user?.uid!,
      room_id: roomId,
    };

    await sendMessage(roomId, messageToSend);
    setMessageText('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter message"
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
      />
      <button>Send Message</button>
    </form>
  );
};

export default MessageInput;
