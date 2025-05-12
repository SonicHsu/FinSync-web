import { initEntry } from "./entry.js";
import { getDateTypeTotals } from "./calculator.js";
import { formatDateForStats } from "./date.js";
import { initMiniCalendars } from "./mini-calendar.js";
import { initViewStatsButtons } from "./view-stats-button.js"

const calendarTemplateElement = document.querySelector("[data-template='day-calendar']");

export function initDayCalendar(parent) {
    const calendarContent = calendarTemplateElement.content.cloneNode(true);
    parent.appendChild(calendarContent);
    initMiniCalendars();
}


export async function updateDayCalendarData(parent, selectedDate, entryStore) {
    const calendarElement = parent.querySelector("[data-day-calendar]");
    const calendarTodayExpense = calendarElement.querySelector("[data-today-expense]");
    const calendarTodayIncome = calendarElement.querySelector("[data-today-income]");
    const calendarEntryList = calendarElement.querySelector("[data-entry-list]");

    calendarEntryList.replaceChildren();

    const date = selectedDate;
    const dataStats = formatDateForStats(date);
    const entries = await entryStore.getEntriesByDate(date);
    console.log(entries);

    const entriesTotal = getDateTypeTotals(entries);
    console.log(entriesTotal[dataStats]?.totalExpense || 0);

    const expense = entriesTotal[dataStats]?.totalExpense || 0;
    const income = entriesTotal[dataStats]?.totalIncome || 0;


    calendarTodayExpense.textContent = expense;
    calendarTodayIncome.textContent = income;

    for (const entry of entries) {
        initEntry(calendarEntryList, entry);
    }

}