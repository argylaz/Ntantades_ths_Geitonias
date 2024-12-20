import {initializeApp} from "firebase/app";
// import { getFirestore } from "firebase/firestore"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyC1WlASCahm1pSxqshK2q5Y5Y6cXIimSBM",
    authDomain: "ntantadesthsgeitonias.firebaseapp.com",
    databaseURL: "https://ntantadesthsgeitonias-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ntantadesthsgeitonias",
    storageBucket: "ntantadesthsgeitonias.firebasestorage.app",
    messagingSenderId: "935738414274",
    appId: "1:935738414274:web:640d34dccf2f59a781175b",
    measurementId: "G-WW6FR6NX5V"
};

const app = initializeApp(config);
// export const db = getFirestore(app);
export default app;
