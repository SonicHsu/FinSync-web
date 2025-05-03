import { isTheSameDay } from "./date.js";

export function initEntryStore() {

    document.addEventListener("entry-create", (event) => {
        const createEntry = event.detail.entry;
        const entries = getEntryForLocalStorage();
        entries.push(createEntry);
        saveEntryIntoLocalStorage(entries);

        document.dispatchEvent(new CustomEvent("entries-change", {
            bubbles: true
        }));
    });

    return {
        getEntriesByDate(date) {
            const entries = getEntryForLocalStorage(); 
            return entries.filter((entry) => isTheSameDay(entry.date, date));
        }
    }
}

function saveEntryIntoLocalStorage(entries) {
    const entriesToSave = entries.map((entry) => ({
        ...entry,
        date: entry.date.toISOString()
    }));

    let entriesJson;
    try {
        entriesJson = JSON.stringify(entriesToSave);
    } catch(error) {
        console.error("Stringify events failed", error);
    }

    localStorage.setItem("entries", entriesJson)
}


function getEntryForLocalStorage() {
    const localStorageEntries = localStorage.getItem("entries");
    if(localStorageEntries === null){
        return [];
    }

    let parsedEntries;
    try{
        parsedEntries = JSON.parse(localStorageEntries);
    }catch(error) {
        console.error("Parse events failed", error);
        return [];
    }

    const entries = parsedEntries.map((entry) => ({
        ...entry,
        date: new Date(entry.date)
    }));

    return entries
}