import { initDialog } from "./dialog.js";
import { initEntryOptionSelector } from "./entry-utils.js";
import { formatMonth } from "./date.js";


// initCharts();



export function initViewStatsDialog(entryStore) {
    const dialog = initDialog("view-stats");
    const entryFormElement = dialog.dialogElement.querySelector("[data-view-stats]");
    const viewStatsTitleElement = entryFormElement.querySelector("[data-view-stats-title]")
    const typeSelector = initEntryOptionSelector(
        entryFormElement,
        "[data-entry-type-button]",
        "entryTypeButton",
        "button-option",
        "button-option-selected",
        "statsTypeChange"
    );

    

    function resetEntryForm(selectors) {

        selectors.resetToDefault();

    }


    // const { typeSelector } = initEntryFormSelectors(entryFormElement);

    document.addEventListener("view-stats-request", (event) => {
        resetEntryForm(typeSelector);
        viewStatsTitleElement.textContent = formatMonth(event.detail.date) + " 月統計";;
        dialog.open();

        document.dispatchEvent(new CustomEvent("view-stats-entries", {
            detail: {
                entryStore: entryStore,
                date: event.detail.date
            },
            bubbles: true
        }

        ))
    })
}



