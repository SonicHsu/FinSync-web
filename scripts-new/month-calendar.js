import { generateMonthCalendarDays, today, isTheSameDay } from "./date.js";

const calendarTemplateElement = document.querySelector("[data-template='month-calendar']");
const calendarDayTemplateElement =document.querySelector("[data-template='month-calendar-day']");

export function initMonthCalendar(parent, selectedDate) {
    const calendarContent = calendarTemplateElement.content.cloneNode(true);
    const calendarElement = calendarContent.querySelector("[data-month-calendar]");
    const calendarDayListElement = calendarElement.querySelector("[data-month-calendar-day-list]");

    const calendarDays = generateMonthCalendarDays(selectedDate);

    for(const calendarDay of calendarDays) {
        initCalendarDay(calendarDayListElement, calendarDay, selectedDate)
    }

    parent.appendChild(calendarElement);
}

 function initCalendarDay(parent, calendarDay, currentSelectedMonthDate) {
    const calendarDayContent = calendarDayTemplateElement.content.cloneNode(true);
    const calendarDayElement = calendarDayContent.querySelector("[data-month-calendar-day]");
    const calendarDayLabelElement = calendarDayElement.querySelector("[data-month-calendar-day-label]");
    const calendarDayNumber = calendarDayLabelElement.querySelector("[data-day-number]");
    const calendarDayEntryCount = calendarDayLabelElement.querySelector("[data-day-entry-count]");
    const calendarDaySummary = calendarDayLabelElement.querySelector("[data-day-summary]");
    const calendarDayExpenseTotal = calendarDaySummary.querySelector("[data-expense-total]");
    const calendarDayIncomeTotal = calendarDaySummary.querySelector("[data-income-total]");

    calendarDayNumber.textContent = calendarDay.getDate();

    if(calendarDay.getMonth() !== currentSelectedMonthDate.getMonth()) {
        calendarDayElement.classList.add("opacity-25");
    }

    if (isTheSameDay(today(), calendarDay)) {
        calendarDayLabelElement.classList.remove("bg-white/10");    
        calendarDayLabelElement.classList.add("bg-blue-600/50");
        calendarDayLabelElement.classList.add("border");
        calendarDayLabelElement.classList.add("border-blue-600");
    }

    parent.appendChild(calendarDayElement);
 }