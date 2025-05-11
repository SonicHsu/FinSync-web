import { today, subtractMonths, addMonths, generateMonthCalendarDays, isTheSameDay } from "./date.js";

export function initMiniCalendars() {
    const miniCalendarDayListElement = document.querySelector("[data-mini-calendar-day-list]");
    const miniCalendarDayListItemContent = document.querySelector('[data-template="mini-calendar-day-list-item"]')


    let selectedDate = today();
    const calendarDays = generateMonthCalendarDays(selectedDate);

    for (const calendarDay of calendarDays) {
        const miniCalendarDayListItemElement = miniCalendarDayListItemContent.content.cloneNode(true);
        const calendarDayElement = miniCalendarDayListItemElement.querySelector("[data-mini-calendar-day]");
        calendarDayElement.textContent = calendarDay.getDate();

        miniCalendarDayListElement.appendChild(calendarDayElement);
    }


}