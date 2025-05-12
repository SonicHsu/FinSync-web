import { initCharts } from "./chart.js";
import { initDialog } from "./dialog.js";


// initCharts();



export function initViewStatsDialog() {
    const dialog = initDialog("view-stats");

    document.addEventListener("view-stats-request", () => {
          dialog.open();
    })


}



