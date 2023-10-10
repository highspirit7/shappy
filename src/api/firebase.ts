import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import type { User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export async function login(): Promise<void> {
  await signInWithPopup(auth, provider).catch(console.error);
}

export async function logout(): Promise<void> {
  await signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback: (arg: User | null) => void): void {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
