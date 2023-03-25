import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../api/firebase";
import { Message } from "../../entities/message";
import { sendMessage } from "../../api/messages";

interface MessageInputProps {
  roomId: string;
}

const inputStyle = {
  padding: '.5rem',
  width: '80%',
  borderRadius: '.5rem',
  border: '1px solid #CCC',
  color: '#555'
}

const buttonStyle = {

}

const MessageInput: React.FC<MessageInputProps> = ({ roomId }) => {
  const [messageText, setMessageText] = useState("");

  const [user] = useAuthState(auth);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const messageToSend: Message = {
      created_at: new Date(),
      text: messageText,
      user_id: user?.uid!,
      room_id: roomId,
    };

    await sendMessage(roomId, messageToSend);
    setMessageText("");
  };

  return (
    <form style={{ display: 'flex', gap: '.5rem' }} onSubmit={submitHandler}>
      <input
        style={inputStyle}
        type="text"
        placeholder="Enter message"
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
      />
      <button style={buttonStyle}>Send Message</button>
    </form>
  );
};

export default MessageInput;
