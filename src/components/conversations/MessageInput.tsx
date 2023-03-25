import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../api/firebase";
import { Message } from "../../entities/message";
import { sendMessage } from "../../api/messages";
import { FaArrowCircleUp } from "react-icons/fa";
import PhotoSelect from "./PhotoSelect";
interface MessageInputProps {
  roomId: string;
}

const inputStyle = {
  padding: ".5rem",
  width: "80%",
  borderRadius: ".5rem",
  border: "1px solid #CCC",
  color: "#555",
  flexGrow: 2,
};

const buttonStyle = {
  border: "none",
  background: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.75rem",
  color: "#33ACFF",
  flexGrow: 1,
};

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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <PhotoSelect roomId={roomId} />
      <form style={{ display: "flex" }} onSubmit={submitHandler}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Enter message"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
        />
        <button style={buttonStyle}>
          <FaArrowCircleUp />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
