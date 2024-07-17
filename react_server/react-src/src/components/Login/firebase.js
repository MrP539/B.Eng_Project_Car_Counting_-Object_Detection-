// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEc8hQ1hmHUoXH85Qn0MhcCN3gmCNe8aM",
  authDomain: "sut-cardetecttion.firebaseapp.com",
  projectId: "sut-cardetecttion",
  storageBucket: "sut-cardetecttion.appspot.com",
  messagingSenderId: "378620198176",
  appId: "1:378620198176:web:32e78faeba21cf111e2b45",
  measurementId: "G-3DRF7PZ1N4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app); // Remove the app argument here
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
