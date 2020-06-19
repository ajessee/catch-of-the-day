// src/base.js
import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBwSCV-DhceZeXCInkAwPQNwprd8oGMqls",
  authDomain: "catch-of-the-day-63244.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-63244.firebaseio.com",
  projectId: "catch-of-the-day-63244",
  storageBucket: "catch-of-the-day-63244.appspot.com",
  messagingSenderId: "917712543689",
  appId: "1:917712543689:web:1304ee089f0fc98138d218",
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;
