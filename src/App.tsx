import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RoomsPage from "./components/rooms/RoomsPage";
import RoomPage from "./components/rooms/RoomPage";
import BottomNavBar from "./components/BottomNavBar";
import Profile from "./components/Profile";

import { logout } from "./api/firebase";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="rooms/:id" element={<RoomPage />} />
        <Route
          path="/profile"
          element={
            <Profile
              name="Matt"
              user={{ email: "hi@hi.com" }}
              logout={logout}
            />
          }
        />
      </Routes>
      <div>
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
