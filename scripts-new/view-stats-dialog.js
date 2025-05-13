import { initDialog } from "./dialog.js";


// initCharts();



export function initViewStatsDialog(entryStore) {
    const dialog = initDialog("view-stats");

    document.addEventListener("view-stats-request", (event) => {
        dialog.open();

        document.dispatchEvent(new CustomEvent("view-stats-entries", {
            detail:{
                entryStore:entryStore,
                date: event.detail.date
            },
            bubbles: true
        }

        ))
    })
}



