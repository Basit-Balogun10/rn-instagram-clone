import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2QR89TumjXaMH-pzoOk2BVwcfHXg-evA",
    authDomain: "rn-instagram-clone-928e5.firebaseapp.com",
    projectId: "rn-instagram-clone-928e5",
    storageBucket: "rn-instagram-clone-928e5.appspot.com",
    messagingSenderId: "1037409406910",
    appId: "1:1037409406910:web:810f5baac7c8cd6e41b3ef",
};

// Initialize Firebase
console.log("FIREBASE ------>>>>>>", firebase);
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
console.log("FIREBASE ------>>>>>>22", firebase);

const db = firebase.firestore();

export { firebase, db };
