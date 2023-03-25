import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

import { auth } from "../../api/firebase";
import { Room } from "../../entities/room";
import AddRoomForm from "./AddRoomForm";
import RoomList from "./RoomList";
import { getAllRooms } from "../../api/rooms";

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const getRooms = async () => {
      const response = await getAllRooms();
      if (response) {
        setRooms(response);
      }
    };
    getRooms();
  }, []);

  const addRoomHandler = (room: Room) => {
    setRooms((prevState) => {
      return [...prevState, room];
    });
  };

  return (
    <div>
      <h2>Previously Created Rooms</h2>
      <RoomList rooms={rooms} />
      <h3>Want to add a room?</h3>
      <AddRoomForm onAddRoom={addRoomHandler} />
    </div>
  );
};

export default RoomsPage;
