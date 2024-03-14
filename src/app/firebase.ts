// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAev603USn2Da238jWZFf6QZ3_NQK5pHUk',
  authDomain: 'chatintime-25f97.firebaseapp.com',
  projectId: 'chatintime-25f97',
  storageBucket: 'chatintime-25f97.appspot.com',
  messagingSenderId: '398061194174',
  appId: '1:398061194174:web:8823934c94d8fddfd2c7ef',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
