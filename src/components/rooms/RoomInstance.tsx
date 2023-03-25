import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "./RoomChatBubble.css";
import {
  collection,
  query,
  getCountFromServer,
  getDocs,
} from "@firebase/firestore";
import { db } from "../../api/firebase";
import { Room } from "../../entities/room";

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
          <div>
            <Avatar></Avatar>
          </div>
          <div id="room-name">{name}</div>
          <div id="member-count">{memberCount} online members</div>
          <div id="message-count">{roomMessagesCount}</div>
        </ListItem>
      </ListItemAvatar>
    </List>
  );
};

export default RoomInstance;
