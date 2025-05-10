import { auth } from "./firebase-config.js"; 
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const provider = new GoogleAuthProvider();
  
const loginButton = document.querySelector("[data-login-button]");


export function initLogin() {
    loginButton.addEventListener("click",() => {
        signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("登入成功：", user.displayName);
        
        window.dispatchEvent(new CustomEvent("userLoggedIn", {
         detail: { user },
    }));
      })
      .catch((error) => {
        console.error("登入失敗：", error.message);
      });
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.dispatchEvent(new CustomEvent("userLoggedIn", {
                detail: { user },
            }));
        } else {
            window.dispatchEvent(new CustomEvent("userLoggedOut", {
                detail: { user: null },
            }));
        }
    });
}
