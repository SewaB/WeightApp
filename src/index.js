import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';


 var config = {
    apiKey: "AIzaSyCqRmVyQJKMjCOVlt1TjW2mWxJUnGsYA4A",
    authDomain: "weightloss-634ec.firebaseapp.com",
    databaseURL: "https://weightloss-634ec.firebaseio.com",
    projectId: "weightloss-634ec",
    storageBucket: "weightloss-634ec.appspot.com",
    messagingSenderId: "1059258384304"
  };
  firebase.initializeApp(config);

  
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
