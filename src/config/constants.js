import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAfi5psiSXXSIrA6OdmrmczYD0Sh2nh0yo",
  authDomain: "doppelganger-d5c0a.firebaseapp.com",
  databaseURL: "https://doppelganger-d5c0a.firebaseio.com",
  projectId: "doppelganger-d5c0a",
  storageBucket: "doppelganger-d5c0a.appspot.com",
  messagingSenderId: "651582023630"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase.firestore().settings({
  timestampsInSnapshots: true
});
