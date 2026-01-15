import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA-re9plYFbo2hnpkt1oTwJo4ZHes6WZaU",
    authDomain: "recipebook-fb16b.firebaseapp.com",
    projectId: "recipebook-fb16b",
    storageBucket: "recipebook-fb16b.firebasestorage.app",
    messagingSenderId: "213197710946",
    appId: "1:213197710946:web:f3a05df4fae61ac023933b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Make functions public so HTML can see them
window.handleAuth = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const remember = document.getElementById('rememberMe').checked;
    const isSignUp = document.getElementById('mainBtn').innerText === "Sign Up";

    try {
        // Set how long the user stays logged in
        await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);

        if (isSignUp) {
            await createUserWithEmailAndPassword(auth, email, pass);
            alert("Account Created!");
        } else {
            await signInWithEmailAndPassword(auth, email, pass);
        }
        window.location.href = 'temp-dashboard.html';
    } catch (err) {
        alert("Error: " + err.message);
    }
};

window.handleLogout = async () => {
    await signOut(auth);
    window.location.href = 'index.html';
};