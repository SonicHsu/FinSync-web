import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

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
const db = getFirestore(app);


export { auth, db };

