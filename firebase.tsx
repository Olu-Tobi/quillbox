import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCONdvE2Lmuj8txJLDbQWUOSfy5On2kTlU",
    authDomain: "chatrgram-3b00d.firebaseapp.com",
    projectId: "chatrgram-3b00d",
    storageBucket: "chatrgram-3b00d.appspot.com" ,
    messagingSenderId: "91649183840",
    appId: "1:91649183840:web:b8b1525c0dc1845c2e3305"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider};