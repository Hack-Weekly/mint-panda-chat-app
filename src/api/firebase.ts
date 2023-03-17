// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import {  getFirestore, Firestore,  } from 'firebase/firestore';
import { getAuth, Auth } from '@firebase/auth';
import { signInWithGoogle, logout } from './auth/login';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBcfOMHcZGyfz2sU3PJADcKljtMFTfsZis',
  authDomain: 'mint-panda-chat-app.firebaseapp.com',
  projectId: 'mint-panda-chat-app',
  storageBucket: 'mint-panda-chat-app.appspot.com',
  messagingSenderId: '849720086673',
  appId: '1:849720086673:web:74ace30fa1c8a21a2e2f30',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export {
  auth,
  db,
  signInWithGoogle,
  logout,
};