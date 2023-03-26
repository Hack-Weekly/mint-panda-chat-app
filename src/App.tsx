import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Messages from "./components/conversations/ConversationsPage";
import RoomsPage from "./components/rooms/RoomsPage";
import RoomPage from "./components/rooms/RoomPage";
import BottomNavBar from "./components/BottomNavBar";
import Profile from "./components/Profile";

import { logout } from "./api/firebase";
import Conversation from "./components/conversations/Conversation";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="messages/:id" element={<Conversation />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="rooms/:id" element={<RoomPage />} />
        <Route path="/profile" element={<Profile logout={logout} />} />
      </Routes>
      <div>
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
