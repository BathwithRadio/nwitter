import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyACPApDrzJIe3rvMUEuHwW6k_jIXBijLLM",
    authDomain: "nwitter-862d2.firebaseapp.com",
    projectId: "nwitter-862d2",
    storageBucket: "nwitter-862d2.appspot.com",
    messagingSenderId: "203949411881",
    appId: "1:203949411881:web:772498810abe0028949638"
};

export default firebase.initializeApp(firebaseConfig);