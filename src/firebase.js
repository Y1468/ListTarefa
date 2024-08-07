import firebase from "firebase/compat/app";
import "firebase/compat/database"
import "firebase/compat/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBV5MlYMzOKO8HPf1XZdhaH8Qq3ciH10Zs",
    authDomain: "listtarefa-50975.firebaseapp.com",
    projectId: "listtarefa-50975",
    storageBucket: "listtarefa-50975.appspot.com",
    messagingSenderId: "185347607526",
    appId: "1:185347607526:web:e895b98b516e140f2ba427"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase}
  