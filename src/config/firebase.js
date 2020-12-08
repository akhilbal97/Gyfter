
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBb7ybclTwQkqEcZOYB1AwCrN5W9K3aJXk",
    authDomain: "gyfterapp.firebaseapp.com",
    databaseURL: "https://gyfterapp.firebaseio.com",
    projectId: "gyfterapp",
    storageBucket: "gyfterapp.appspot.com",
    messagingSenderId: "576676890386",
    appId: "1:576676890386:web:86790c3475cc6b7efdd5cb"
  };


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();