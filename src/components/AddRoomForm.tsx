import { useState } from 'react';
import { addRoom } from '../api/rooms';
import { Room } from '../entities/room';

interface AddRoomFormProps {
  onAddRoom: (room: Room) => void;
}

const AddRoomForm: React.FC<AddRoomFormProps> = ({ onAddRoom }) => {
  const [roomName, setRoomName] = useState('');

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const roomRef = await addRoom(roomName);
    if (roomRef) {
      const newRoom: Room = {
        id: roomRef.id,
        name: roomName,
        messages: [],
      };
      onAddRoom(newRoom);
    }
    setRoomName('');
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="roomName">Room Name:</label>
        <input
          type="text"
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
        />
        <button>Add Room</button>
      </form>
    </>
  );
};

export default AddRoomForm;
