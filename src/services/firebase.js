import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAQtCgx25ljboNmM9I4s8bcB22qAGldUMs",
  authDomain: "chatty-f1283.firebaseapp.com",
  projectId: "chatty-f1283",
  storageBucket: "chatty-f1283.appspot.com",
  messagingSenderId: "1088240852572",
  appId: "1:1088240852572:web:04f38aa7bb2984fca91099",
  measurementId: "G-1FC4BP3ERJ"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const messaging = firebase.messaging();