import { Link } from "react-router-dom";
import { Room } from "../../entities/room";
import { CircularProgress, List, styled } from "@mui/material";
import RoomInstance from "./RoomInstance";

interface RoomListProps {
  isLoading: boolean;
  rooms: Room[];
}

const StyledList = styled(List)`
  margin: 16px;
  max-width: 100%;
  a {
    color: black;
    text-decoration: none;
  }
`;

export default function RoomsList({ isLoading, rooms }: RoomListProps) {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (!rooms || !rooms.length) {
    return <p>No rooms created yet</p>;
  }

  return (
    <StyledList>
      {rooms.map((room, i) => {
        return (
          <Link to={`/rooms/${room.id}`} key={room.id}>
            <RoomInstance
              id={room.id}
              name={room.name}
              messages={room.messages}
            />
          </Link>
        );
      })}
    </StyledList>
  );
}
