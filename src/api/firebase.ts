import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';

import type { User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export async function login(): Promise<null | User> {
  return await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);

      return user;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function logout(): Promise<null> {
  return await signOut(auth)
    .then(() => null)
    .catch((error) => {
      console.error(error);
      return null;
    });
}
