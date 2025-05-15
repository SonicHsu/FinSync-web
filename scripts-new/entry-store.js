import { isTheSameDay, isTheSameMonth } from "./date.js";
import { getUser } from "./state.js";
import { collection, addDoc, getDocs, Timestamp, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { db } from "./firebase-config.js";

export function initEntryStore() {
    document.addEventListener("entry-create", async (event) => {
        const createEntry = event.detail.entry;
        const userId = getUser();
        console.log("準備存");

        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        try {

            const { docId, ...entryData } = createEntry;
            const entryToSave = {
                ...entryData,
                date: Timestamp.fromDate(entryData.date)
                
            };
            // 儲存到 Firestore
            const collectionName = `entries_${userId}`;
            const entriesCollectionRef = collection(db, collectionName);
            await addDoc(entriesCollectionRef, entryToSave);

            // 觸發 entries-change 事件，通知 UI 更新
            document.dispatchEvent(new CustomEvent("entries-change", {
                bubbles: true
            }));
        } catch (error) {
            console.error("Error creating entry:", error);
        }
    });

    document.addEventListener("entry-edit", async (event) => {
        const editedEntry = event.detail.entry;
        const userId = getUser();

        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        try {
            const { docId, ...entryData } = editedEntry;
            const entryToSave = {
                ...entryData,
                date: Timestamp.fromDate(entryData.date)
            };
            // 更新 Firestore
            const collectionName = `entries_${userId}`;
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, entryToSave);

            document.dispatchEvent(new CustomEvent("entries-change", {
                bubbles: true
            }));
        } catch (error) {
            console.error("Error editing entry:", error);
        }
    });

    document.addEventListener("entry-delete", async (event) => {
        const deletedEntry = event.detail.entry;
        const userId = getUser();

        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        try {
            const { docId } = deletedEntry;
            if (!docId || typeof docId !== "string") {
                throw new Error("無效或缺少 docId");
            }
            const collectionName = `entries_${userId}`;
            const docRef = doc(db, collectionName, docId);
            await deleteDoc(docRef);

            console.log("條目刪除完成");
            document.dispatchEvent(new CustomEvent("entries-change", {
                bubbles: true
            }));
        } catch (error) {
            console.error("刪除條目失敗:", error);
        }
    });


    return {
        async getEntriesByDate(date) {
            const userId = getUser();
            if (!userId) {
                console.error("User not authenticated");
                return [];
            }

            try {
                const collectionName = `entries_${userId}`;
                const entriesCollectionRef = collection(db, collectionName);
                const querySnapshot = await getDocs(entriesCollectionRef);

                const entries = querySnapshot.docs
                    .map(doc => ({
                        docId: doc.id,
                        ...doc.data(),
                        date: doc.data().date.toDate()
                    }))
                    .filter(entry => isTheSameDay(entry.date, date));
                return entries;
            } catch (error) {
                console.error("Error fetching entries:", error.message);
                return [];
            }
        },
        async getEntriesByMonth(date) {
            const userId = getUser();
            if (!userId) {
                console.error("User not authenticated");
                return [];
            }

            try {
                const collectionName = `entries_${userId}`;
                const entriesCollectionRef = collection(db, collectionName);
                const querySnapshot = await getDocs(entriesCollectionRef);

                const entries = querySnapshot.docs
                    .map(doc => ({
                        docId: doc.id,
                        ...doc.data(),
                        date: doc.data().date.toDate()
                    }))
                    .filter(entry => isTheSameMonth(entry.date, date));
                return entries;
            } catch (error) {
                console.error("Error fetching entries:", error.message);
                return [];
            }
        }
    };
}
