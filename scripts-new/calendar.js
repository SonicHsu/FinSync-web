import { today } from "./date.js"
import { initMonthCalendar } from "./month-calendar.js";
import { initDayCalendar } from "./day-calendar.js";
import { initEntryCreateButtons } from "./entry-create-button.js";
 
export function initCalendar(entryStore) {
    const calendarElement = document.querySelector("[data-calendar]");

    let selectedView = "day";
    let selectedDate = today();

    function refreshCalendar() {
        calendarElement.replaceChildren();

        if (selectedView === "month") {
            initMonthCalendar(calendarElement, selectedDate, entryStore);
        } else {
            initDayCalendar(calendarElement, selectedDate, entryStore);
        }
        initEntryCreateButtons(selectedDate);
    }

    document.addEventListener("view-change", (event) => {
        selectedView = event.detail.view;
        refreshCalendar();
    });

    document.addEventListener("date-change", (event) => {
        selectedDate = event.detail.date;
        refreshCalendar()
    });

    document.addEventListener("entries-change", () => {
        refreshCalendar()
    })


    refreshCalendar()
}