// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoK7g5ImKvtWcVRnvNzUtf1TRLj73Yf10",
  authDomain: "bloghub-104ca.firebaseapp.com",
  projectId: "bloghub-104ca",
  storageBucket: "bloghub-104ca.firebasestorage.app",
  messagingSenderId: "722462913132",
  appId: "1:722462913132:web:648d4da2ac325a48441e49"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp