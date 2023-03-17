import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const login = async () => {
  try {
    const provider = new GoogleAuthProvider();
    // Create a popup for user to sign in with google
    const { user } = await signInWithPopup(auth, provider);
    // Send user to frontend
    return user;
  } catch (error) {
    // handle errors
  }
};

const signInWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    // handle errors
  }
};

const logout = () => {
  signOut(auth);
};

export { signInWithGoogle, logout }