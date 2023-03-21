import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function BottomNavBar() {
  const navigate = useNavigate();

  const handleMessage = () => {
    navigate("/dashboard");
  };

  const handleRoom = () => {
    navigate("/rooms");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <BottomNavigation
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      showLabels
    >
      <BottomNavigationAction
        label="Message"
        icon={<ChatBubbleIcon />}
        onClick={() => handleMessage()}
      />
      <BottomNavigationAction
        label="Room"
        icon={<GroupsIcon />}
        onClick={() => handleRoom()}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<PersonIcon />}
        onClick={() => handleProfile()}
      />
    </BottomNavigation>
  );
}
