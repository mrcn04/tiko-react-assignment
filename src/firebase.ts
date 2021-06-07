import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA-wgQo3zz5__iW682Ko23XX5VjcWyI_Hc',
  authDomain: 'tiko-react-assignment.firebaseapp.com',
  projectId: 'tiko-react-assignment',
  storageBucket: 'tiko-react-assignment.appspot.com',
  messagingSenderId: '413310870229',
  databaseURL:
    'https://tiko-react-assignment-default-rtdb.europe-west1.firebasedatabase.app/',
  appId: '1:413310870229:web:2868597e9869332f57b85c',
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
export const auth = firebase.auth();
