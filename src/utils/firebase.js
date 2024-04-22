// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAezAUD8eSor1KzVZsAxxGOYLlUgY3o5zY",
  authDomain: "netflixgpt-37d63.firebaseapp.com",
  projectId: "netflixgpt-37d63",
  storageBucket: "netflixgpt-37d63.appspot.com",
  messagingSenderId: "244241771286",
  appId: "1:244241771286:web:4a1451f6ce04143423be37",
  measurementId: "G-E35TKTDSVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
