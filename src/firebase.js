import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCYCCvPp1c1uBbEPw430C3aKLO4iURqtzI",
    authDomain: "instibuzz-2f91b.firebaseapp.com",
    projectId: "instibuzz-2f91b",
    storageBucket: "instibuzz-2f91b.appspot.com",
    messagingSenderId: "398286177390",
    appId: "1:398286177390:web:e6fca3c7a9d9bf9bdfd27f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);