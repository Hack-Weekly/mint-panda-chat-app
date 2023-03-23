// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  DocumentData,
  collection,
  CollectionReference,
} from 'firebase/firestore';
import { getAuth, Auth } from '@firebase/auth';
import { signInWithGoogle, signInByNickname, logout } from './auth/login';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAICXgGJKAn1VLxbhZVkziACUGUIa7AWgU',
  authDomain: 'mint-panda-chat-app-489ee.firebaseapp.com',
  projectId: 'mint-panda-chat-app-489ee',
  storageBucket: 'mint-panda-chat-app-489ee.appspot.com',
  messagingSenderId: '665729033482',
  appId: '1:665729033482:web:cf37354a0df7e895cb06f3',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

const createCollection = <T = DocumentData>(
  collectionName: string,
  collectionRecordId?: string,
  subCollection?: string
) => {
  if (
    typeof collectionRecordId === 'undefined' &&
    typeof subCollection === 'undefined'
  ) {
    return collection(db, collectionName) as CollectionReference<T>;
  } else {
    return collection(
      db,
      `${collectionName}/${collectionRecordId}/${subCollection}`
    ) as CollectionReference<T>;
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  signInByNickname,
  logout,
  createCollection,
};
