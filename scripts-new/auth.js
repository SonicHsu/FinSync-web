import { auth } from "./firebase-config.js";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

const loginButton = document.querySelector("[data-login-button]");
const logoutButton = document.querySelector("[data-logout-button]");
const loginUsername = document.querySelector("[data-login-username]");


export function initAuth() {
    loginButton.addEventListener("click", () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("登入成功：", result.user.displayName);
                // ✅ 不用手動派發事件，Firebase 會觸發 onAuthStateChanged
            })
            .catch((error) => {
                console.error("登入失敗：", error.message);
            });
    });
    logoutButton.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                console.log("登出中");
                // onAuthStateChanged 會自動觸發 userLoggedOut 事件
            })
            .catch((error) => {
                console.error("登出失敗：", error.message);
            });
    });

    initLogin()

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

function initLogin() {
    window.addEventListener("userLoggedIn", (event) => {
    const user = event.detail.user;    
    loginUsername.textContent = user.displayName;    
    loginUsername.classList.remove("hidden");    
    loginButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");
});

window.addEventListener("userLoggedOut", () => {
    loginButton.classList.remove("hidden");
    logoutButton.classList.add("hidden");
    loginUsername.classList.add("hidden");
});
}
