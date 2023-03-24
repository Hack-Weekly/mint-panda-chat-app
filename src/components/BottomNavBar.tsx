import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import { BottomNavigationAction } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../api/firebase";
import "./BottomNavBar.css";

export default function BottomNavBar() {
  const [user] = useAuthState(auth);
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

  return user ? (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "rgba(130, 120, 120, 0.05)",
      }}
      component={"div"}
    >
      <div className="navAction" onClick={() => handleMessage()}>
        <img className="navIcon" src="/images/messages.png" />
        <span>Messages</span>
      </div>
      <div className="navAction" onClick={() => handleRoom()}>
        <img className="navIcon" src="/images/rooms.png" />
        <span>Rooms</span>
      </div>
      <div className="navAction" onClick={() => handleProfile()}>
        <img className="navIcon" src="/images/profile.png" />
        <span>Profile</span>
      </div>
    </BottomNavigation>
  ) : null;
}
