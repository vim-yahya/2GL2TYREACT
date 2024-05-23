// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";

import "firebase/compat/auth"
import "firebase/compat"
import "firebase/compat/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy13KcVqlsZpwzTlMrstGvrnPdFCRL7p0",
  authDomain: "ty2gl2.firebaseapp.com",
  databaseURL: "https://ty2gl2-default-rtdb.firebaseio.com",
  projectId: "ty2gl2",
  storageBucket: "ty2gl2.appspot.com",
  messagingSenderId: "61686848896",
  appId: "1:61686848896:web:be2c5653525d559f187565"
};
// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;