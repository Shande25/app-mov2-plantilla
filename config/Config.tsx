import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCw5wb7WeIbRnELHXO8JKpB2hYkDhoCUUA",
  authDomain: "snakeii.firebaseapp.com",
  databaseURL: "https://snakeii-default-rtdb.firebaseio.com",
  projectId: "snakeii",
  storageBucket: "snakeii.appspot.com",
  messagingSenderId: "230765432813",
  appId: "1:230765432813:web:427c3fc99ce11d5a5fa1e4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {  db, auth, storage};
