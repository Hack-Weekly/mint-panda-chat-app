import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "./RoomChatBubble.css";

import { Message } from "../../entities/message";
import { getUserById } from "../../api/users";

const RoomChatBubble = ({ text, user_id, created_at }: Message) => {
  // convert created_at to new Date for converting to a time as a string
  const convertMessageDate = new Date(
    created_at.seconds * 1000 + created_at.nanoseconds / 1000000
  );

  // get current date
  const todaysDate = new Date();

  // convert dates to use in conditional statement
  const createFullDate = (dateObject: Date): string => {
    const month = dateObject.getMonth() + 1; //months from 1-12
    const day = dateObject.getDay();
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // to grab only first name of the user when needed
  const getFirstName = (user: any) => {
    const firstName = user.displayName.split(" ")[0];
    return firstName;
  };

  // console.log(user.uid);
  useEffect(() => {
    const getUsers = async () => {
      if (user_id) {
        await getUserById(user_id).then((userData) => {
          console.log(userData);
        });
      }
    };
    getUsers();
  }, []);

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <ListItemAvatar>
        <ListItem disablePadding>
          <div id="text">{text}</div>
          <div id="date">
            {createFullDate(todaysDate) === createFullDate(convertMessageDate)
              ? convertMessageDate.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : convertMessageDate.toLocaleDateString([], {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) +
                " at " +
                convertMessageDate.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
          </div>
        </ListItem>
      </ListItemAvatar>
    </List>
  );
};

export default RoomChatBubble;
