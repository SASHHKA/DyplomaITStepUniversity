import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOHDO79DEeNiW4gf1uv63S-sLFrnP2U70",
  authDomain: "eshop-7bd35.firebaseapp.com",
  projectId: "eshop-7bd35",
  storageBucket: "eshop-7bd35.appspot.com",
  messagingSenderId: "845768574492",
  appId: "1:845768574492:web:3cff835a0a4f4985cb01d9"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
