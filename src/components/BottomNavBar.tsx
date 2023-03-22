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
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "#f0f0f0",
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Messages"
        icon={<ChatBubbleIcon color="primary" />}
        onClick={() => handleMessage()}
      />
      <BottomNavigationAction
        label="Rooms"
        icon={<GroupsIcon color="primary" />}
        onClick={() => handleRoom()}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<PersonIcon color="primary" />}
        onClick={() => handleProfile()}
      />
    </BottomNavigation>
  );
}
