import firebase from "firebase";



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCLatN44zTbUL2fdmIilwVqZ9OpXrraQxY",
    authDomain: "react-photo-app-d339b.firebaseapp.com",
    databaseURL: "https://react-photo-app-d339b.firebaseio.com",
    projectId: "react-photo-app-d339b",
    storageBucket: "react-photo-app-d339b.appspot.com",
    messagingSenderId: "852435164601",
    appId: "1:852435164601:web:29add440a7fe34b0d4ea68",
    measurementId: "G-WN3FV1EWWF"
});
// Reference : https://firebase.google.com/docs/web/setup
// database access
const db = firebaseApp.firestore();
// access authoriaction log in and out
const auth = firebase.auth();
// store images/posts
const storage = firebase.storage();

export { db, auth, storage };