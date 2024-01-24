// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZFRVixTcz7u507qZWHve79FZXebXq3zo",
  authDomain: "comfort-d5191.firebaseapp.com",
  projectId: "comfort-d5191",
  storageBucket: "comfort-d5191.appspot.com",
  messagingSenderId: "65301887132",
  appId: "1:65301887132:web:be4f8d77b5ab1a9b1d9559"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app) 
export const db=getFirestore(app)
export const storage= getStorage(app)
export default app