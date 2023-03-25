import { createCollection } from "./firebase";
import { collection, where } from "firebase/firestore";
import { db } from "./firebase";
import { onSnapshot, query, addDoc, orderBy, getDocs } from "@firebase/firestore";
import { Message } from "../entities/message";

const sendMessage = async (roomId: string, message: Message) => {
  const messagesCol = createCollection<Message>("rooms", roomId, "messages");
  try {
    const thing = await addDoc(messagesCol, message);
  } catch (error) {
    console.log(error);
  }
};

const getIndividualMessages = async (userId: string) => {
    const fromQueries = query(
        collection(db, "conversations"), 
            where('user_to_id', '==', userId),
            orderBy('created_at', 'desc')
    );
    const toQueries = query(
        collection(db, "conversations"), 
            where('user_from_id', '==', userId),
            orderBy('created_at', 'desc')
    );

    const fromDocs = await getDocs(fromQueries);
    const toDocs = await getDocs(toQueries);
    return fromDocs.docs.concat(toDocs.docs);
}

const getMessages = (
  roomId: string,
  callback: (messages: Message[]) => void
) => {
  const messagesCol = createCollection<Message>("rooms", roomId, "messages");
  try {
    return onSnapshot(
      query(messagesCol, orderBy("created_at", "asc")),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((messageDoc) => ({
          id: messageDoc.id,
          ...messageDoc.data(),
        }));
        callback(messages);
      }
    );
  } catch (error) {}
};

export { sendMessage, getIndividualMessages, getMessages };
