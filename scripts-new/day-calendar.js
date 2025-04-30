const calendarTemplateElement = document.querySelector("[data-template='day-calendar']");

export function initDayCalendar(parent, selectedDate, entryStore) {
    const calendarContent = calendarTemplateElement.content.cloneNode(true);
    const calendarElement = calendarContent.querySelector("[data-day-calendar]");
    const calendarTodayExpense = calendarElement.querySelector("[data-today-expense]");
    const calendarTodayIncome = calendarElement.querySelector("[data-today-income]");
    const calendarEntryList = calendarElement.querySelector("[data-entry-list]");

    const date  = selectedDate;
    const entries = entryStore.getEntriesByDate(date);
    console.log(entries);
    
    parent.appendChild(calendarElement);    
}