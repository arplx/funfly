// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0n4OAKU_oXCfUS6FRrObbcDNLKdGJMKg",
  authDomain: "instareels-clone.firebaseapp.com",
  projectId: "instareels-clone",
  storageBucket: "instareels-clone.appspot.com",
  messagingSenderId: "16063097213",
  appId: "1:16063097213:web:1e0af85d30aaac54200414",
  measurementId: "G-0J350QNR2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage, db };