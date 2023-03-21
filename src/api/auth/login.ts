import { GoogleAuthProvider, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

const signInWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    // handle errors
  }
};

const signInByNickname = async (nickname: string) => {
    try {
        const res = await signInAnonymously(auth);
        console.log(res);
        // const q = query(collection(db, 'users'), where('name', '==', nickname));
        // const docs = await getDocs(q);
        // if (docs.docs.length === 0) {
        //     await addDoc(collection(db, 'users'), {
        //         uid: '',
        //         name: nickname,
        //     });
        // }
    } catch (err) {
        // handle errors
    }
}

const logout = () => {
  signOut(auth);
};

export { signInWithGoogle, signInByNickname, logout };
