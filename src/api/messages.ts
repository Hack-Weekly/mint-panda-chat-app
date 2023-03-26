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

// Firebase doesn't seem to support OR queries so two query results are concatenated
const getConversationPreviews = async (userId: string) => {
    const toQueries = query(
      collection(db, "conversations"), 
          where('user_from_id', '==', userId),
          orderBy('created_at', 'desc')
    );
    const fromQueries = query(
        collection(db, "conversations"), 
            where('user_to_id', '==', userId),
            orderBy('created_at', 'desc')
    );

    const toDocs = await getDocs(toQueries);
    const fromDocs = await getDocs(fromQueries);
    return fromDocs.docs.concat(toDocs.docs);
}

const getConversationMessages = async (contactId: string) => {
    const toQueries = query(
      collection(db, "conversations"), 
          where('user_to_id', '==', contactId),
          orderBy('created_at', 'desc')
    );
    const fromQueries = query(
      collection(db, "conversations"), 
          where('user_from_id', '==', contactId),
          orderBy('created_at', 'desc')
    );
    const toDocs = await getDocs(toQueries);
    const fromDocs = await getDocs(fromQueries);
    return {to: toDocs, from: fromDocs};
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

export { sendMessage, getConversationPreviews, getConversationMessages, getMessages };
