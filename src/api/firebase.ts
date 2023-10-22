import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

import type { User } from '../types/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import type { Product, ProductFromDB } from '../types/product';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

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
    } else {
      const defaultUser = {
        uid: '',
        displayName: null,
        email: null,
        photoURL: null,
        isAdmin: false
      };
      callback(defaultUser);
    }
  });
}

async function adminUser(user: User): Promise<User> {
  return await get(ref(dbRef, `admins`))
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

export async function addNewProduct(
  product: Product,
  imageURL: string
): Promise<void> {
  const id = uuidv4();
  await set(ref(dbRef, `products/${id}`), {
    ...product,
    id,
    image: imageURL,
    price: parseInt(product.price.toString()),
    sizes: product.options.split(',')
  });
}

export async function getProducts(): Promise<ProductFromDB[]> {
  return await get(ref(dbRef, `products`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  });
}
