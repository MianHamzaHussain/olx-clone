import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDaH12ZbSQMG5E81kdquhqLIiU4T-yrvJY",
  authDomain: "olx-clone-c4f62.firebaseapp.com",
  databaseURL: "gs://olx-clone-c4f62.appspot.com/",
  projectId: "olx-clone-c4f62",
  storageBucket: "olx-clone-c4f62.appspot.com",

  messagingSenderId: "928509159212",
  appId: "1:928509159212:web:a85c52b5d230308d22ee89",
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
