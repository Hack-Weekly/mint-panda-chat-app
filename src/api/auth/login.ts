import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

export const login = async () => {
  try {
    const provider = new GoogleAuthProvider();
    // Create a popup for user to sign in with google
    const { user } = await signInWithPopup(auth, provider);
    // Send user to frontend
    return user;
  } catch (error) {
    console.log(error);
  }
};
