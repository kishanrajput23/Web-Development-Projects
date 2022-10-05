import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAurVqLIPZs-i9zhTzU2653BamZ04STOFQ",
    authDomain: "instagram-clone-react-82c46.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-82c46-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-82c46",
    storageBucket: "instagram-clone-react-82c46.appspot.com",
    messagingSenderId: "77831745601",
    appId: "1:77831745601:web:da79094101194db414d6c0",
    measurementId: "G-08PEGQD759"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db,auth,storage};
 
