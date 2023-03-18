import { db } from './firebase';
import {
  onSnapshot,
  doc,
  query,
  addDoc,
  collection,
  orderBy,
} from '@firebase/firestore';
import { Message } from '../entities/message';

const sendMessage = async (roomId: string, message: Message) => {
  try {
    await addDoc(collection(db, 'rooms', roomId, 'messages'), message);
  } catch (error) {
    console.log(error);
  }
};

const getMessages = (roomId: string, callback: (messages: any) => void) => {
  try {
    return onSnapshot(
      query(
        collection(db, 'rooms', roomId, 'messages'),
        orderBy('created_at', 'asc')
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(messages);
      }
    );
  } catch (error) {}
};

export { sendMessage, getMessages };
