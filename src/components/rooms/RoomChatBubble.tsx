import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "./RoomChatBubble.css";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { Message } from "../../entities/message";
import { db } from "../../api/firebase";

const RoomChatBubble = ({ text, user_id, created_at }: Message) => {
  const [user, setUser] = useState<any>("");

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

  // Grab only first letter of the first name of the user for chat avatar bubble
  const getFirstNameLetter = (user: any) => {
    if (user) {
      const firstLetter = user.split(" ")[0][0];
      return firstLetter;
    }
  };

  // get the user data from db using the user id
  useEffect(() => {
    const getUsers = async (id: string) => {
      const usersRef = collection(db, "users");
      try {
        const q = query(usersRef, where("uid", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          if (doc.exists()) {
            setUser(doc.data());
          } else {
            console.log("User not in chat room");
          }
        });
      } catch (error) {
        alert(error);
      }
    };
    getUsers(user_id);
  }, [text]);

  return (
    <List
      dense
      sx={{ 
        width: "100%", 
        maxWidth: 360, 
      }}
    >
      <ListItemAvatar>
        <ListItem disablePadding>
          <div>
            <Avatar>{getFirstNameLetter(user.name)}</Avatar>
          </div>
          <div style={{        
            background: '#DDD', 
            margin: '.1rem .4rem', 
            padding: '1rem',
            width: '100%',
            borderRadius: '.75rem'
          }}
          >
            <div id="text">{text}</div>
            <div id="date" style={{fontSize: '.6rem', position: 'absolute', bottom: '.25rem', right: '1rem'}}>
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
          </div>
        </ListItem>
      </ListItemAvatar>
    </List>
  );
};

export default RoomChatBubble;
