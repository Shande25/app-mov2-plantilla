import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
export {  db, auth};
