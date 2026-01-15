import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    browserLocalPersistence, 
    browserSessionPersistence 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Your specific Firebase configuration from the screenshot
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

// Logic to handle both Login and Sign Up
window.handleAuth = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const remember = document.getElementById('rememberMe').checked;
    const isSignUp = document.getElementById('mainBtn').innerText === "Sign Up";

    if (!email || !pass) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        // Handle "Remember Me"
        await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);

        if (isSignUp) {
            await createUserWithEmailAndPassword(auth, email, pass);
            alert("Account created successfully!");
        } else {
            await signInWithEmailAndPassword(auth, email, pass);
        }
        
        // Redirect to your dashboard
        window.location.href = 'temp-dashboard.html';
    } catch (err) {
        alert("Error: " + err.message);
    }
};