// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9nEUEgzehLxeUuKbHmKHesf4FVkyF9ug",
  authDomain: "library-system-4eed1.firebaseapp.com",
  databaseURL: "https://library-system-4eed1-default-rtdb.firebaseio.com/",
  projectId: "library-system-4eed1",
  storageBucket: "library-system-4eed1.appspot.com",
  messagingSenderId: "87617920475",
  appId: "1:87617920475:web:cf2a847604a1dba7501bfe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();


