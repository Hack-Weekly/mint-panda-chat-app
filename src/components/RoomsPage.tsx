import { useState, useEffect } from 'react';
import { Room } from '../entities/room';

import { getAllRooms } from '../api/rooms';
import AddRoomForm from './AddRoomForm';
import RoomList from './RoomList';

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const getRooms = async () => {
      const response = await getAllRooms();
      if (response) {
        setRooms(response);
        console.log(response);
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
