import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-storage.js";

// 1. YOUR CONFIG (Keep your keys here)
const firebaseConfig = {
    apiKey: "AIzaSy...", 
    authDomain: "recipebook-fb16b.firebaseapp.com",
    projectId: "recipebook-fb16b",
    storageBucket: "recipebook-fb16b.firebasestorage.app",
    messagingSenderId: "213197710946",
    appId: "1:213197710946:web:f3a05df4fae61ac023933b",
    measurementId: "G-6VJ0E6YKBW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 2. LOGIN & SIGN UP LOGIC
window.handleLogin = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        window.location.href = 'temp-dashboard.html';
    } catch (e) { alert("Login Error: " + e.message); }
};

window.handleSignUp = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Account created successfully!");
        window.location.href = 'temp-dashboard.html';
    } catch (e) { alert("Sign Up Error: " + e.message); }
};

// 3. IMAGE UPLOAD LOGIC
// Use this inside your 'Save Recipe' function
async function uploadRecipeImage(file) {
    if (!file) return 'https://via.placeholder.com/350x180';
    const storageRef = ref(storage, `recipe_images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
}

// 4. DATABASE SAVE LOGIC
window.saveRecipeToCloud = async (recipeData, imageFile) => {
    try {
        const imageUrl = await uploadRecipeImage(imageFile);
        recipeData.image = imageUrl;
        
        // Save to Firestore 'recipes' collection
        await addDoc(collection(db, "recipes"), recipeData);
        alert("Recipe Saved to Cloud!");
        location.reload(); 
    } catch (e) { console.error("Error saving:", e); }
};