import { isTheSameDay } from "./date.js";

export function initEntryStore() {
    const entries = [];

    document.addEventListener("entry-create", (event) => {
        const createEntry = event.detail.entry;
        entries.push(createEntry);

        document.dispatchEvent(new CustomEvent("entries-change", {
            bubbles: true
        }));
    });

    return {
        getEntriesByDate(date) {
            return entries.filter((entry) => isTheSameDay(entry.date, date));
        }
    }
}

