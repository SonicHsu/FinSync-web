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

  // 初始化 Firestore 文件 entries_userId（可省略內容只做佔位）
  // try {
  //   const userDocRef = doc(db, `entries_users`, user.uid); // ← 注意這裡不是 entries_uid，是 entries_users/uid
  //   await setDoc(userDocRef, {
  //     createdAt: serverTimestamp()
  //   }, { merge: true }); // merge:true 防止覆蓋既有內容
  //   console.log("使用者 Firestore 文件初始化完成");
  // } catch (error) {
  //   console.error("Firestore 使用者文件初始化失敗:", error);
  // }
});
