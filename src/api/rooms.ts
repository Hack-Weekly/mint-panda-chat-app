import { collection, addDoc, getDocs, getDoc, doc } from '@firebase/firestore';
import { db } from './firebase';
import { Room } from '../entities/room';

const addRoom = async (roomName: string) => {
  try {
    const roomRef = await addDoc(collection(db, 'rooms'), {
      name: roomName,
      messages: [],
    });
    return roomRef;
  } catch (error) {
    console.log(error);
    alert('There was an issue adding the room.');
  }
};

const getAllRooms = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'rooms'));
    const rooms = querySnapshot.docs.map((doc) => {
      return new Room(doc.id, doc.data().name, doc.data().messages);
      // return {
      //   id: doc.id,
      //   name: doc.data().name,
      //   messages: doc.data().messages,
      // };
    });

    return rooms;
  } catch (error) {
    console.log(error);
    alert('There was an error getting all the rooms');
  }
};

const getRoomById = async (id: string) => {
  try {
    const docRef = doc(db, 'rooms', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("That room doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export { addRoom, getAllRooms, getRoomById };
