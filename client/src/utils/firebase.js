
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewai-18dd4.firebaseapp.com",
  projectId: "interviewai-18dd4",
  storageBucket: "interviewai-18dd4.firebasestorage.app",
  messagingSenderId: "979542917304",
  appId: "1:979542917304:web:4adf2155f019f15cc9b44d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider}