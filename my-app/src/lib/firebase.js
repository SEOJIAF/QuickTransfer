import { initializeApp, getApps, getApp } from "firebase/app";
import firebase from "firebase/compat/app";
    import "firebase/compat/firestore";
    import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";

    const firebaseConfig = {
        apiKey: "AIzaSyDC9EcUpsh9zNxeOR7zZPB0iNVo8PTJYXg",
        authDomain: "transfer-stuff-27c58.firebaseapp.com",
        projectId: "transfer-stuff-27c58",
        storageBucket: "transfer-stuff-27c58.appspot.com",
        messagingSenderId: "133415054473",
        appId: "1:133415054473:web:3544c1ec74e77dc7296a58",
        measurementId: "G-7WM27BSTGL"
    };

// ✅ Prevents duplicate initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
