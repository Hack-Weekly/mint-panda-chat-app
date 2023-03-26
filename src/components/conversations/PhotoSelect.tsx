import { useFilePicker } from "use-file-picker";
import { Message } from "../../entities/message";
import { sendMessage } from "../../api/messages";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../api/firebase";
import classes from "./PhotoSelect.module.css";
import { FaPlusSquare } from "react-icons/fa";

interface PhotoSelectProps {
  roomId: string;
}

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

const PhotoSelect: React.FC<PhotoSelectProps> = ({ roomId }) => {
  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    accept: [".jpg", ".jpeg", ".png"],
    readAs: "DataURL",
  });

  const [user] = useAuthState(auth);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const messageToSend: Message = {
      created_at: new Date(),
      user_id: user?.uid!,
      room_id: roomId,
      file_content: filesContent[0].content,
    };

    clear();
    await sendMessage(roomId, messageToSend);
  };

  // useEffect(() => {
  //   console.log(filesContent[0].content);
  // }, [filesContent]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {filesContent.length === 0 && (
          <button style={buttonStyle} onClick={openFileSelector} type="button">
            < FaPlusSquare />
          </button>
        )}
        {filesContent.map((file) => {
          return (
            <>
              <img
                className={classes.imagePreview}
                src={file.content}
                alt={file.name}
              />
              <button>Send</button>
            </>
          );
        })}
      </form>
    </div>
  );
};

export default PhotoSelect;
