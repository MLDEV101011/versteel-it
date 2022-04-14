import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5Op_ZzLuLZvA9um7k-v45n9Bwi0dA2YM",
    authDomain: "versteel-it.firebaseapp.com",
    projectId: "versteel-it",
    storageBucket: "versteel-it.appspot.com",
    messagingSenderId: "675677696784",
    appId: "1:675677696784:web:884ace53f69039943beb95",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// register admin in firebase with email and password
const registerWithEmailAndPassword = async (
    firstName,
    lastName,
    email,
    password
) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        // add admin to firestore
        await addDoc(collection(db, "admins"), {
            uid: user.uid,
            firstName,
            lastName,
            email,
            authProvider: "local",
            createdAt: new Date(),
        });
    } catch (err) {
        console.log(err);
    }
};

// login admin in firebase with email and password
const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    sendPasswordReset,
    logout,
}
