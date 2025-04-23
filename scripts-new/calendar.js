import { today } from "./date.js"
import { initMonthCalendar } from "./month-calendar.js";
import { initDayCalendar } from "./day-calendar.js";
import { initEntryCreateButton } from "./entry-create-button.js";
 
export function initCalendar() {
    const calendarElement = document.querySelector("[data-calendar]");

    let selectedView = "month";
    let selectedDate = today();

    function refreshCalendar() {
        calendarElement.replaceChildren();

        if (selectedView === "month") {
            initMonthCalendar(calendarElement, selectedDate);
        } else {
            initDayCalendar(calendarElement, selectedDate);
        }
        initEntryCreateButton();
    }

    document.addEventListener("view-change", (event) => {
        selectedView = event.detail.view;
        refreshCalendar();
    });

    document.addEventListener("date-change", (event) => {
        selectedDate = event.detail.date;
        refreshCalendar()
    });

    refreshCalendar()
}