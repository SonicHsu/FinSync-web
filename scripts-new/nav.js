import { today, addDays, addMonths, subtractDays, subtractMonths } from "./date.js"



export function initNav() {
    const todayButtonElement = document.querySelector("[data-nav-today-button]");
    const previousButtonElement = document.querySelector("[data-nav-pre-button]");
    const nextButtonElement = document.querySelector("[data-nav-next-button]");
    const navYear = document.querySelector("[data-nav-year]");
    const navMonth = document.querySelector("[data-nav-month]");
    const navDay = document.querySelector("[data-nav-day]");
    const weekDaySpan = document.querySelector("[data-nav-day-of-week]");
    const selectDateButton = document.querySelector("[data-select-date-button]");
    const selectDatePicker = document.querySelector("[data-select-date-picker]");



    let selectedDate = today();
    let selectedView = "day";

    selectDateButton.addEventListener("click", () => {
        selectDatePicker.showPicker();
    });

    selectDatePicker.addEventListener("change", () => {
        const selectedDateStr = selectDatePicker.value
        document.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: new Date(selectedDateStr)
            },
            bubbles: true
        }));
    });

    todayButtonElement.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: today()
            },
            bubbles: true
        }));
    });

    previousButtonElement.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: getPreviousDate(selectedView, selectedDate)
            },
            bubbles: true
        }));
    });

    nextButtonElement.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: getNextDate(selectedView, selectedDate)
            },
            bubbles: true
        }));
    });

    document.addEventListener("date-change", (event) => {
        selectedDate = event.detail.date;
        refreshDateElement(navYear, navMonth, navDay, weekDaySpan, selectedDate);
    });

    document.addEventListener("view-change", (event) => {
        selectedView = event.detail.view;
        const isDayView = selectedView === "day";

        navDay.classList.toggle("hidden", !isDayView);
        weekDaySpan.classList.toggle("hidden", !isDayView);

    });


    refreshDateElement(navYear, navMonth, navDay, weekDaySpan, selectedDate);
}

function refreshDateElement(navYear, navMonth, navDay, weekDaySpan, selectedDate) {
    const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
    navYear.textContent = selectedDate.getFullYear();
    navMonth.textContent = selectedDate.getMonth() + 1;
    navDay.textContent = selectedDate.getDate();
    weekDaySpan.textContent = weekday;
}

function getPreviousDate(selectedView, selectedDate) {
    if (selectedView === "day") {
        return subtractDays(selectedDate, 1);
    }
    return subtractMonths(selectedDate, 1);
}

function getNextDate(selectedView, selectedDate) {
    if (selectedView === "day") {
        return addDays(selectedDate, 1);
    }
    return addMonths(selectedDate, 1);
}
