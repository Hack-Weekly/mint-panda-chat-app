import { createCollection } from "./firebase";
import { collection, where, or } from "firebase/firestore";
import { db } from "./firebase";
import { onSnapshot, query, addDoc, orderBy, getDocs, QuerySnapshot, DocumentData } from "@firebase/firestore";
import { Message } from "../entities/message";
import { Conversation } from "../entities/conversation";

const sendMessage = async (roomId: string, message: Message) => {
  const messagesCol = createCollection<Message>("rooms", roomId, "messages");
  try {
    const thing = await addDoc(messagesCol, message);
  } catch (error) {
    console.log(error);
  }
};

const getConversationPreviews = async (userId: string, callback: (a: any) => void) => {
    const q = query(
        collection(db, "conversations"),
            or(
                where('user_from_id', '==', userId),
                where('user_to_id', '==', userId)
            ),
            orderBy('created_at', 'desc')
    );
    try {
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map((doc) => (
                doc.data()
            )));
        });
    } catch (e) {}
}

const getConversationMessages = async (contactId: string, callback: (m: DocumentData[]) => void) => {
    const q = query(
        collection(db, "conversations"), 
            or(
                where('user_to_id', '==', contactId),
                where('user_from_id', '==', contactId),
            ),
          orderBy('created_at', 'desc')
    );
    try {
        return onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map((doc) => (
                doc.data()
            )));
        });
    } catch (e) {}
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
