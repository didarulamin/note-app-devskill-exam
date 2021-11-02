import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import { useState, useEffect } from "react";

export default function useFirebase() {
  const [user, setUser] = useState(false);
  const firebaseConfig = {
    apiKey: "AIzaSyBbcdlxa3mzZXXdx_T6MoFSidgGh5IYHGo",
    authDomain: "devskill-exam-note-app.firebaseapp.com",
    projectId: "devskill-exam-note-app",
    storageBucket: "devskill-exam-note-app.appspot.com",
    messagingSenderId: "644671455463",
    appId: "1:644671455463:web:7a2b382c44b8da72a56242",
    measurementId: "G-VY0P96ZFCY",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    const unsubscribed = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setUser({});
      }
    });

    return () => unsubscribed;
  }, []);

  //   console.log(user, "from useFirebase");
  return {
    firebase,
    user,
    setUser,
  };
}
