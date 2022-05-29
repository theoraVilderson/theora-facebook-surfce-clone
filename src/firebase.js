// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeLVK2-yFCgAMJWbzyEx7GS_ISwvBwkuM",
  authDomain: "theora-facebook-surface-clone.firebaseapp.com",
  projectId: "theora-facebook-surface-clone",
  storageBucket: "theora-facebook-surface-clone.appspot.com",
  messagingSenderId: "291688169693",
  appId: "1:291688169693:web:d6cb6ee4c71abe4b0e5b34",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
const auth = getAuth();
auth.useDeviceLanguage();

export {
  auth,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  signInWithPopup,
  GoogleAuthProvider,
};
