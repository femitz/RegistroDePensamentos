// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAti2La5DlLa8rhDwO-lYK8DTkyLm4F08g",
  authDomain: "registrodepens.firebaseapp.com",
  projectId: "registrodepens",
  storageBucket: "registrodepens.appspot.com",
  messagingSenderId: "777876423731",
  appId: "1:777876423731:web:c266668dcb19b964bfcf46",
  measurementId: "G-N8RH4E96GR"
};

// Initialize Firebase

export const Firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(Firebase);