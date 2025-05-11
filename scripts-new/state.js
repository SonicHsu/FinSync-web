import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { db } from "./firebase-config.js";

const state = {
  user: null,
};

export function setUser(user) {
  state.user = user;
  document.dispatchEvent(new CustomEvent("userStateUpdated", {
    detail: { user },
  }));
}

export function getUser() {
  return state.user ? state.user.uid : null;
}

window.addEventListener("userLoggedIn", async (event) => {
  const user = event.detail.user;
  setUser(user); // 更新全局狀態

    document.dispatchEvent(new CustomEvent("entries-change", {
    bubbles: true,
  }));
});

window.addEventListener("userLoggedOut", async (event) => {
  const user = event.detail.user;
  setUser(user); // 更新全局狀態

    document.dispatchEvent(new CustomEvent("entries-change", {
    bubbles: true,
  }));
});


