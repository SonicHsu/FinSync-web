import { generateMonthCalendarDays, today, isTheSameDay, formatDateForStats } from "./date.js";
import { getDateTypeTotals } from "./calculator.js";

const calendarTemplateElement = document.querySelector("[data-template='month-calendar']");
const calendarDayTemplateElement = document.querySelector("[data-template='month-calendar-day']");

export function initMonthCalendar(parent, selectedDate, entryStore) {
    const calendarContent = calendarTemplateElement.content.cloneNode(true);
    const calendarElement = calendarContent.querySelector("[data-month-calendar]");
    const calendarDayListElement = calendarElement.querySelector("[data-month-calendar-day-list]");
    const calendarDayMonthTotal = calendarElement.querySelector("[data-month-total]");

    const calendarDays = generateMonthCalendarDays(selectedDate);

    let totalExpense = 0;
    let totalIncome = 0;

    for (const calendarDay of calendarDays) {
        const { expense, income } = initCalendarDay(calendarDayListElement, calendarDay, selectedDate, entryStore);
        totalExpense += expense;
        totalIncome += income;
    }

    calendarDayMonthTotal.textContent = totalIncome - totalExpense;

    parent.appendChild(calendarElement);
}

function initCalendarDay(parent, calendarDay, currentSelectedMonthDate, entryStore) {
    const calendarDayContent = calendarDayTemplateElement.content.cloneNode(true);
    const calendarDayElement = calendarDayContent.querySelector("[data-month-calendar-day]");
    const calendarDayLabelElement = calendarDayElement.querySelector("[data-month-calendar-day-label]");
    const calendarDayNumber = calendarDayLabelElement.querySelector("[data-day-number]");
    const calendarDayEntryCount = calendarDayLabelElement.querySelector("[data-day-entry-count]");
    const calendarDaySummary = calendarDayLabelElement.querySelector("[data-day-summary]");
    const calendarDayExpenseTotal = calendarDaySummary.querySelector("[data-expense-total]");
    const calendarDayIncomeTotal = calendarDaySummary.querySelector("[data-income-total]");
    

    calendarDayNumber.textContent = calendarDay.getDate();

    if (calendarDay.getMonth() !== currentSelectedMonthDate.getMonth()) {
        calendarDayElement.classList.add("opacity-25");
    }

    const isToday = isTheSameDay(today(), calendarDay);
    calendarDayLabelElement.classList.toggle("calendar-normal", !isToday);
    calendarDayLabelElement.classList.toggle("calendar-today", isToday);

    calendarDayLabelElement.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: calendarDay
            },
            bubbles: true
        }));
    
        document.dispatchEvent(new CustomEvent("view-change", {
            detail: {
                view: "day"
            },
            bubbles: true
        }) )
    })

    const date  = calendarDay;  
    const dataStats = formatDateForStats(date);
    const entries = entryStore.getEntriesByDate(date);
    const entriesCount = entries.length
    const entriesTotal = getDateTypeTotals(entries);

    const expense = entriesTotal[dataStats]?.totalExpense || 0;
    const income = entriesTotal[dataStats]?.totalIncome || 0;
    
    calendarDayExpenseTotal.textContent = expense;
    calendarDayIncomeTotal.textContent = income;
    calendarDayEntryCount.textContent = entriesCount;
    
    calendarDayExpenseTotal.classList.toggle("hidden", expense === 0);
    calendarDayIncomeTotal.classList.toggle("hidden", income === 0);
  
    parent.appendChild(calendarDayElement);

    return { expense, income };
}