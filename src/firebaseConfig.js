import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
    apiKey: "AIzaSyAOQT078LAp5vUbNHEkjSyskuM2gD1RUmY",
    authDomain: "parking-web-app-cda64.firebaseapp.com",
    projectId: "parking-web-app-cda64",
    storageBucket: "parking-web-app-cda64.appspot.com",
    messagingSenderId: "37679185690",
    appId: "1:37679185690:web:7817f2d17b74e1f53776a3",
    measurementId: "G-2SEWV5QTM1"
};

function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
}

initFirebase();


export { firebase };