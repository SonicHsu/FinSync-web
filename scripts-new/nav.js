import { today, addDays, addMonths, subtractDays, subtractMonths } from "./date.js"



export function initNav() {
    const todayButtonElement = document.querySelector("[data-nav-today-button]");
    const previousButtonElement = document.querySelector("[data-nav-pre-button]");
    const nextButtonElement = document.querySelector("[data-nav-next-button]");
    const selectYearButton = document.querySelector("[data-select-year-button]");
    const selectMonthButton = document.querySelector("[data-select-month-button]");
    const selectDayButton = document.querySelector("[data-select-day-button]");
    const weekDaySpan = document.querySelector("[data-selected-day-of-week]");
    const yearPicker = document.querySelector("[data-select-year-picker]");
    const monthPicker = document.querySelector("[data-select-month-picker]");
    const dayPicker = document.querySelector("[data-select-day-picker]");

    let selectedDate = today();
    let selectedView = "day";

    selectYearButton.addEventListener("click", () => {
        yearPicker.showPicker();
    })

    selectMonthButton.addEventListener("click", () => {
        monthPicker.showPicker();
    })

    selectDayButton.addEventListener("click", () => {
        dayPicker.showPicker();
    })

    todayButtonElement.addEventListener("click", () => {
        todayButtonElement.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: today()
            },
            bubbles: true
        }));
    });

    previousButtonElement.addEventListener("click", () => {
        previousButtonElement.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: getPreviousDate(selectedView, selectedDate)
            },
            bubbles: true
        }));
    });

    nextButtonElement.addEventListener("click", () => {
        nextButtonElement.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: getNextDate(selectedView, selectedDate)
            },
            bubbles: true
        }));
    });

    document.addEventListener("date-change", (event) => {
        selectedDate = event.detail.date;
        refreshDateElement(selectYearButton, selectMonthButton, selectDayButton, weekDaySpan, selectedDate);
    });

    document.addEventListener("view-change", (event) => {
        selectedView = event.detail.view;
        const isDayView = selectedView ==="day";

        selectDayButton.classList.toggle("hidden", !isDayView);
        weekDaySpan.classList.toggle("hidden", !isDayView);
        
    });


    refreshDateElement(selectYearButton, selectMonthButton, selectDayButton, weekDaySpan, selectedDate);
}

function refreshDateElement(selectYearButton, selectMonthButton, selectDayButton, weekDaySpan, selectedDate) {
    const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
    selectYearButton.textContent = selectedDate.getFullYear();
    selectMonthButton.textContent = selectedDate.getMonth() + 1;
    selectDayButton.textContent = selectedDate.getDate();
    weekDaySpan.textContent = weekday;
}

function getPreviousDate(selectedView, selectedDate) {
    if(selectedView === "day"){
        return subtractDays(selectedDate, 1);
    }
    return subtractMonths(selectedDate, 1);
}

function getNextDate(selectedView, selectedDate) {
    if(selectedView === "day"){
        return addDays(selectedDate, 1);
    }
    return addMonths(selectedDate, 1);
}
