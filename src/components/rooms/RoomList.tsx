import { Link } from "react-router-dom";
import { Room } from "../../entities/room";
import RoomInstance from "./RoomInstance";

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <ul>
      {rooms.length > 0
        ? rooms.map((room) => {
            return (
              <Link to={`/rooms/${room.id}`} key={room.id}>
                <RoomInstance
                  id={room.id}
                  name={room.name}
                  messages={room.messages}
                />
              </Link>
            );
          })
        : "No rooms created yet!"}
    </ul>
  );
};

export default RoomList;
