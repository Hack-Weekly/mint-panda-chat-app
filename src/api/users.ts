import { getDoc, doc } from "@firebase/firestore";
import { db } from "./firebase";

const getUserById = async (id: string) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("User not in chat room");
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export { getUserById };
