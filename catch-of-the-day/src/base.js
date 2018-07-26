import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAjk-6SjRHMkN76TDWoPz1wgN_yQQVrER8",
  authDomain: "catch-react-wes.firebaseapp.com",
  databaseURL: "https://catch-react-wes.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
