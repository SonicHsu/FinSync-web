import { today, subtractMonths, addMonths, generateMonthCalendarDays, isTheSameDay, formatMonth } from "./date.js";

export function initMiniCalendars() {
    const miniCalendarElement = document.querySelector("[data-mini-calendar]");
    const miniCalendarPreButton = miniCalendarElement.querySelector("[data-mini-calendar-pre-button]");
    const miniCalendarNextButton = miniCalendarElement.querySelector("[data-mini-calendar-next-button]");


    let selectedDate = today();
    let miniCalendarDate = today();

    function refreshMiniCalendar() {
        refreshDateElement(miniCalendarElement, miniCalendarDate);
        refreshDayListElement(
            miniCalendarElement,
            miniCalendarDate,
            selectedDate
        );
    }

    miniCalendarPreButton.addEventListener("click", () => {
        miniCalendarDate = subtractMonths(miniCalendarDate, 1);
        refreshMiniCalendar()
    });


    miniCalendarNextButton.addEventListener("click", () => {
        miniCalendarDate = addMonths(miniCalendarDate, 1);
        refreshMiniCalendar()
    });

    document.addEventListener("date-change", (event) => {
        selectedDate = event.detail.date;
        miniCalendarDate = event.detail.date;
        refreshMiniCalendar();
    });
    refreshMiniCalendar();
}

function refreshDateElement(parent, date) {
    const miniCalendarDateElement = parent.querySelector("[data-mini-calendar-date]");

    miniCalendarDateElement.textContent = formatMonth(date);
}


function refreshDayListElement(parent, miniCalendarDate, selectedDate) {
    const miniCalendarDayListItemContent = document.querySelector('[data-template="mini-calendar-day-list-item"]')
    const miniCalendarDayListElement = parent.querySelector("[data-mini-calendar-day-list]");

    miniCalendarDayListElement.replaceChildren();

    const calendarDays = generateMonthCalendarDays(miniCalendarDate);

    for (const calendarDay of calendarDays) {
        const miniCalendarDayListItemElement = miniCalendarDayListItemContent.content.cloneNode(true);
        const calendarDayElement = miniCalendarDayListItemElement.querySelector("[data-mini-calendar-day]");
        calendarDayElement.textContent = calendarDay.getDate();

        if (miniCalendarDate.getMonth() !== calendarDay.getMonth()) {
            calendarDayElement.classList.add("text-white/30");
        }

        if (isTheSameDay(selectedDate, calendarDay)) {
            calendarDayElement.classList.add("mini-calendar-date-selected");
        }

        if (isTheSameDay(today(), calendarDay)) {
            calendarDayElement.classList.add("mini-calendar-date-today");
        }

        calendarDayElement.addEventListener("click", () => {
            calendarDayElement.dispatchEvent(new CustomEvent("date-change", {
                detail: {
                    date: calendarDay
                },
                bubbles: true
            }))
        });

        miniCalendarDayListElement.appendChild(calendarDayElement);

    }
}