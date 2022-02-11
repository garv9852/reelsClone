import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlUqkhyx6RmoYwjxWu-SvI_AXhMDpJrP4",
  authDomain: "reels4-822b4.firebaseapp.com",
  projectId: "reels4-822b4",
  storageBucket: "reels4-822b4.appspot.com",
  messagingSenderId: "655357229616",
  appId: "1:655357229616:web:d3df6185dd81b6d8634bf5"
};


firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();
const firestore=firebase.firestore();
export const database={
  users:firestore.collection('users'),
  posts:firestore.collection('posts'),
  comments:firestore.collection("comments"),
  getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export const storage=firebase.storage()
