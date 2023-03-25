import * as React from "react";
import { useState, useEffect } from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
import "./RoomChatBubble.css";
import {
  collection,
  query,
  getCountFromServer,
  getDocs,
} from "@firebase/firestore";
import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  styled,
  Chip,
} from "@mui/material";
import { db } from "../../api/firebase";
import { Room } from "../../entities/room";

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
  "salmon",
];

const StyledRoomAvatar = styled(Avatar)`
  background-color: none;
  color: transparent;
`;
const StyledChip = styled(Chip)`
  background-color: #c70039;
  border-radius: 50%;
  color: white;
  font-size: 0.75rem;
  height: 28px;
  width: 28px;

  span {
    padding: 4px;
  }
`;

const RoomInstance = ({ id, name }: Room) => {
  const [roomMessagesCount, setRoomMessagesCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  // counts the number of messages in a room
  useEffect(() => {
    const roomMessages = async (id: any) => {
      const roomMessages = query(collection(db, "rooms", id, "messages"));
      const snapShot = await getCountFromServer(roomMessages);
      setRoomMessagesCount(snapShot.data().count);
    };
    roomMessages(id);
  }, []);

  // counts the number of distinct members in a room
  useEffect(() => {
    const messageMembers = async (id: any) => {
      const q = query(collection(db, "rooms", id, "messages"));
      const querySnapshot = await getDocs(q);
      const members: Array<string> = [];
      querySnapshot.forEach((doc) => {
        if (!members.includes(doc.get("user_id"))) {
          members.push(doc.get("user_id"));
        }
      });
      setMemberCount(members.length);
    };
    messageMembers(id);
  }, []);

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <ListItemAvatar>
        <ListItem disablePadding>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <StyledRoomAvatar
                alt={`icon for ${name}`}
                src=""
                sx={{
                  backgroundImage: `linear-gradient(${
                    colors[Math.floor(Math.random() * colors.length)]
                  }, ${
                    colors[Math.floor(Math.random() * colors.length)]
                  },  lightgray)`,
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              sx={{ maxWidth: "50%" }}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline", fontWeight: "200" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {memberCount === 1
                      ? memberCount + " online member"
                      : memberCount + " online members"}
                  </Typography>
                </React.Fragment>
              }
            />
            <StyledChip label={roomMessagesCount} />
          </ListItem>
        </ListItem>
      </ListItemAvatar>
    </List>
  );
};

export default RoomInstance;
