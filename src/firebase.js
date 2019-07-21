import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAQqBawk_K_Ut6MppzyHe_liUOUlv5kIu4',
  authDomain: 'propertyanalysis-66cbf.firebaseapp.com',
  databaseURL: 'https://propertyanalysis-66cbf.firebaseio.com',
  projectId: 'propertyanalysis-66cbf',
  storageBucket: '',
  messagingSenderId: '426945334219',
  appId: '1:426945334219:web:5d915e7ccd6397b4',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;