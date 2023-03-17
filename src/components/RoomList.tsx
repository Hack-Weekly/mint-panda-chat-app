import { Room } from '../entities/room';

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <ul>
      {rooms.length > 0
        ? rooms.map((room) => {
            return (
              <li key={room.id}>
                <h2>{room.name}</h2>
              </li>
            );
          })
        : 'No rooms created yet!'}
    </ul>
  );
};

export default RoomList;
