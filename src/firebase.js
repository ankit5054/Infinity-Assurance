// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
// import { getAnalytics } from "firebase/analytics";
import { getStorage, } from "firebase/storage";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmMdkYO0nh0uL2_gS6dGrXN90aSy5E8vU",
    authDomain: "proj-6d1f6.firebaseapp.com",
    projectId: "proj-6d1f6",
    storageBucket: "proj-6d1f6.appspot.com",
    messagingSenderId: "738156520738",
    appId: "1:738156520738:web:60606772e2a47d581ff17b",
    measurementId: "G-8Q2JL25WS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const defaultDatabase = getDatabase(app);