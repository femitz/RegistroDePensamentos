// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0suNpNEEBgWoSwUNlkqGvb2TcOQq22Ds",
  authDomain: "registro-de-pensamentos-f7e75.firebaseapp.com",
  projectId: "registro-de-pensamentos-f7e75",
  storageBucket: "registro-de-pensamentos-f7e75.appspot.com",
  messagingSenderId: "510138577714",
  appId: "1:510138577714:web:0d3706b470ac09bfba9d2b"
};

// Initialize Firebase

export const Firebase = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore()