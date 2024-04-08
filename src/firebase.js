import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_firebase_apiKey,
    authDomain: process.env.REACT_APP_firebase_authDomain,
    projectId: process.env.REACT_APP_firebase_projectId,
    storageBucket: process.env.REACT_APP_firebase_storageBucket,
    messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
    appId: process.env.REACT_APP_firebase_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);