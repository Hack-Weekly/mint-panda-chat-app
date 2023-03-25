import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "./RoomChatBubble.css";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "../../api/firebase";
import { Room } from "../../entities/room";
import { getRoomById } from "../../api/rooms";

const RoomInstance = ({ id, name, messages }: Room) => {
  const [user, setUser] = useState<any>("");

  const q = query(collection(db, "rooms"), where("id", "==", id));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

  console.log(room);
  //   console.log(id);
  // get the user data from db using the user id
  //   useEffect(() => {
  //     const getUsers = async (id: string) => {
  //       const usersRef = collection(db, "users");
  //       try {
  //         const q = query(usersRef, where("uid", "==", id));
  //         const querySnapshot = await getDocs(q);
  //         querySnapshot.forEach(async (doc) => {
  //           if (doc.exists()) {
  //             setUser(doc.data());
  //           } else {
  //             console.log("User not in chat room");
  //           }
  //         });
  //       } catch (error) {
  //         alert(error);
  //       }
  //     };
  //     // getUsers(user_id);
  //   }, [text]);

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
          <div id="member-count"></div>
          <div id="message-count"></div>
        </ListItem>
      </ListItemAvatar>
    </List>
  );
};

export default RoomInstance;
