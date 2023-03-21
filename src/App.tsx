import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RoomsPage from "./components/rooms/RoomsPage";
import RoomPage from "./components/rooms/RoomPage";
import BottomNavBar from "./components/navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="rooms/:id" element={<RoomPage />} />
      </Routes>
      <div>
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
