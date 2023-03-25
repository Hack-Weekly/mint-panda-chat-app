import { Link } from "react-router-dom";
import { Room } from "../../entities/room";
import * as React from "react";
import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  styled,
  Chip
} from "@mui/material";

interface RoomListProps {
  isLoading: boolean;
  rooms: Room[];
}

const colors = [
  "red",
  "limegreen",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  "lightblue",
  "lawngreen",
  "darkslateblue",
  "darkgreen",
  "paleturquoise",
  "salmon"
];

const StyledList = styled(List)`
background: linear-gradient(#f7f7f7, lightgray);
margin: 16px;
max-width: 100%;
  a {
    color: black;
    text-decoration: none;
  }
`;
const StyledRoomAvatar = styled(Avatar)`
  background-color: none;
  color: transparent;

`;
const StyledChip = styled(Chip)`
  background-color: #C70039;
  border-radius: 50%;
  color: white;
  font-size: 0.75rem;
  height: 28px;
  width: 28px ;

  span {
    padding: 4px;
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
            <ListItem alignItems="center">
              <ListItemAvatar>
                <StyledRoomAvatar
                  alt={`icon for ${room.name}`}
                  src=""
                  sx={{
                    backgroundImage: `linear-gradient(${colors[
                      Math.floor(Math.random() * colors.length)
                    ]}, ${colors[
                      Math.floor(Math.random() * colors.length)
                    ]},  lightgray)`
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={room.name}
                sx={{ maxWidth: "50%" }}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline", fontWeight: '200' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      some fun text or stats about the room?
                    </Typography>
                  </React.Fragment>
                }
              />
              <StyledChip label={Math.floor(Math.random() * 100)} />
            </ListItem>
          </Link>
        );
      })}
    </StyledList>
  );
}
