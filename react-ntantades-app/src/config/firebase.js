import {initializeApp} from "firebase/app";
import {browserLocalPersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { initializeAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC1WlASCahm1pSxqshK2q5Y5Y6cXIimSBM",
    authDomain: "ntantadesthsgeitonias.firebaseapp.com",
    databaseURL: "https://ntantadesthsgeitonias-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ntantadesthsgeitonias",
    storageBucket: "ntantadesthsgeitonias.firebasestorage.app",
    messagingSenderId: "935738414274",
    appId: "1:935738414274:web:640d34dccf2f59a781175b",
    measurementId: "G-WW6FR6NX5V"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: browserLocalPersistence,
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);