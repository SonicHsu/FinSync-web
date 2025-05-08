import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyCkqD9Dol7OVJdbVsIAbz6nLH75D3yxHT4",
  authDomain: "finsync-web.firebaseapp.com",
  projectId: "finsync-web",
  storageBucket: "finsync-web.firebasestorage.app",
  messagingSenderId: "286060847718",
  appId: "1:286060847718:web:a8b2795360b9bda53983a7",
  measurementId: "G-TG0CH09BND"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Google 登入功能
document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("✅ 登入成功：", user.displayName, user.uid);
  } catch (error) {
    console.error("❌ 登入失敗：", error.message);
  }
});