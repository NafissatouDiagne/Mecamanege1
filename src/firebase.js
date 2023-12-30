
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ7rLLg2PZfV9y9QBWUmdD8hSeTg5-dP8",
  authDomain: "mecafemme-35685.firebaseapp.com",
  projectId: "mecafemme-35685",
  storageBucket: "mecafemme-35685.appspot.com",
  messagingSenderId: "253072092088",
  appId: "1:253072092088:web:bd8c7a25a34a73fa217d4d"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth=getAuth()
 const storage= getStorage();
 const  db= getFirestore();
 export {app,auth,storage,db};