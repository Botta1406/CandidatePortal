// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

// Replace with your Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyA_tyAObKpeWqtvtZEEeETUe4bKcB7TflU",
    authDomain: "candidateportal-41a2a.firebaseapp.com",
    projectId: "candidateportal-41a2a",
    // storageBucket: "candidateportal-41a2a.firebasestorage.app",
    storageBucket: "candidateportal-41a2a.appspot.com",
    messagingSenderId: "629060570958",
    appId: "1:629060570958:web:72625f0caa0c84fdd0581f",
    measurementId: "G-YLLDSSYZPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export { auth };
