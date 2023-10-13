import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import type { User } from '../types/auth';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const dbRef = getDatabase(app);

export async function login(): Promise<void> {
  await signInWithPopup(auth, provider).catch(console.error);
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function onUserStateChanged(callback: (arg: User | null) => void): void {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      const { uid, displayName, email, photoURL } = user;
      adminUser({
        uid,
        displayName,
        email,
        photoURL,
        isAdmin: false
      })
        .then((result) => {
          callback(result);
        })
        .catch(console.error);
    }
  });
}

async function adminUser(user: User): Promise<User> {
  return await get(ref(dbRef, `admin`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        return { ...user, isAdmin: admins.includes(user.uid) };
      } else {
        return user;
      }
    })
    .catch((error) => {
      console.error(error);
      return user;
    });
}
