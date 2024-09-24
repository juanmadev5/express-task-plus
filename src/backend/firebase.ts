import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnKSULu-qd92KPlCgeaASBOn8GEWLk4f4",
  authDomain: "express-task-plus.firebaseapp.com",
  databaseURL: "https://express-task-plus-default-rtdb.firebaseio.com",
  projectId: "express-task-plus",
  storageBucket: "express-task-plus.appspot.com",
  messagingSenderId: "478505341474",
  appId: "1:478505341474:web:a1d5ffe5e34209917d707b",
  measurementId: "G-CJ6H7BKNJ6",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
