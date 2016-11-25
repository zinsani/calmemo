// @flow
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAlL7FUQ0nerz-xK93_o3A1wMtvuG7r8A4",
  authDomain: "calmemo-3026d.firebaseapp.com",
  databaseURL: "https://calmemo-3026d.firebaseio.com",
  storageBucket: "calmemo-3026d.appspot.com",
  messagingSenderId: "401446010815"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;

