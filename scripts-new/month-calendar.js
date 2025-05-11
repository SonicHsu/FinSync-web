import { generateMonthCalendarDays, today, isTheSameDay, formatDateForStats } from "./date.js";
import { getDateTypeTotals } from "./calculator.js";

const calendarTemplateElement = document.querySelector("[data-template='month-calendar']");
const calendarDayTemplateElement = document.querySelector("[data-template='month-calendar-day']");

// 初始化月曆的 DOM 結構（僅顯示）
export function initMonthCalendar(parent, selectedDate) {
    const calendarContent = calendarTemplateElement.content.cloneNode(true);
    const calendarElement = calendarContent.querySelector("[data-month-calendar]");
    const calendarDayListElement = calendarElement.querySelector("[data-month-calendar-day-list]");

    // 生成當前月份的日曆天數（初始使用當前日期）
    const calendarDays = generateMonthCalendarDays(selectedDate);

    // 初始化每一天的 DOM 元素
    for (const calendarDay of calendarDays) {
        initCalendarDay(calendarDayListElement, calendarDay);
    }

    parent.appendChild(calendarElement);
}

// 初始化單個天的 DOM 結構
function initCalendarDay(parent, calendarDay) {
    const calendarDayContent = calendarDayTemplateElement.content.cloneNode(true);
    const calendarDayElement = calendarDayContent.querySelector("[data-month-calendar-day]");
    const calendarDayLabelElement = calendarDayElement.querySelector("[data-month-calendar-day-label]");
    const calendarDayNumber = calendarDayLabelElement.querySelector("[data-day-number]");
    const calendarDayEntryCount = calendarDayLabelElement.querySelector("[data-day-entry-count]");
    const calendarDaySummary = calendarDayLabelElement.querySelector("[data-day-summary]");
    const calendarDayExpenseTotal = calendarDaySummary.querySelector("[data-expense-total]");
    const calendarDayIncomeTotal = calendarDaySummary.querySelector("[data-income-total]");

    // 設置日期和 data-date 屬性
    calendarDayNumber.textContent = calendarDay.getDate();
    calendarDayElement.setAttribute("data-date", formatDateForStats(calendarDay));

    // 設置月份透明度（初始使用當前月份）
    const currentMonth = new Date().getMonth();
    if (calendarDay.getMonth() !== currentMonth) {
        calendarDayElement.classList.add("opacity-25");
    }

    // 設置今天樣式
    const isToday = isTheSameDay(today(), calendarDay);
    calendarDayLabelElement.classList.toggle("calendar-normal", !isToday);
    calendarDayLabelElement.classList.toggle("calendar-today", isToday);

    calendarDayExpenseTotal.classList.add("hidden");
    calendarDayIncomeTotal.classList.add("hidden");

    // 添加點擊事件
    calendarDayLabelElement.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("date-change", {
            detail: { date: calendarDay },
            bubbles: true
        }));
        document.dispatchEvent(new CustomEvent("view-change", {
            detail: { view: "day" },
            bubbles: true
        }));
    });

    parent.appendChild(calendarDayElement);

    return {
        element: calendarDayElement,
        entryCount: calendarDayEntryCount,
        expenseTotal: calendarDayExpenseTotal,
        incomeTotal: calendarDayIncomeTotal
    };
}

// 更新月曆的資料（僅處理資料和更新顯示）
export async function updateMonthCalendarData(parent, selectedDate, entryStore) {
    const calendarElement = parent.querySelector("[data-month-calendar]");
    const calendarDayListElement = calendarElement.querySelector("[data-month-calendar-day-list]");
    const calendarDayMonthTotal = calendarElement.querySelector("[data-month-total]");

    const calendarDays = generateMonthCalendarDays(selectedDate);
    calendarDayListElement.replaceChildren();

    // 一步驟：初始化 UI 元素，收集 dayElement
    const dayElements = calendarDays.map(calendarDay => {
        const { element: dayElement, entryCount, expenseTotal, incomeTotal } = initCalendarDay(calendarDayListElement, calendarDay);
        const calendarDayLabelElement = dayElement.querySelector("[data-month-calendar-day-label]");

        // 設定當月透明度與今天樣式
        dayElement.classList.toggle("opacity-25", calendarDay.getMonth() !== selectedDate.getMonth());
        const isToday = isTheSameDay(today(), calendarDay);
        calendarDayLabelElement.classList.toggle("calendar-normal", !isToday);
        calendarDayLabelElement.classList.toggle("calendar-today", isToday);

        return {
            calendarDay,
            dayElement,
            entryCount,
            expenseTotal,
            incomeTotal
        };
    });

    // 二步驟：同時撈所有資料
    const entryPromises = dayElements.map(({ calendarDay }) =>
        entryStore.getEntriesByDate(calendarDay)
            .then(entries => {
                const entriesCount = entries.length;
                const entriesTotal = getDateTypeTotals(entries);
                const dateKey = formatDateForStats(calendarDay);
                const expense = entriesTotal[dateKey]?.totalExpense || 0;
                const income = entriesTotal[dateKey]?.totalIncome || 0;
                return { calendarDay, entriesCount, expense, income };
            })
            .catch(error => {
                console.error(`Failed to fetch entries for ${formatDateForStats(calendarDay)}:`, error);
                return { calendarDay, entriesCount: 0, expense: 0, income: 0 };
            })
    );

    const entryResults = await Promise.all(entryPromises);

    // 三步驟：更新 UI 顯示
    let totalExpense = 0;
    let totalIncome = 0;

    for (const result of entryResults) {
        const { calendarDay, entriesCount, expense, income } = result;
        const dayData = dayElements.find(d => isTheSameDay(d.calendarDay, calendarDay));

        if (!dayData) continue;

        dayData.expenseTotal.textContent = expense;
        dayData.incomeTotal.textContent = income;
        dayData.entryCount.textContent = entriesCount;

        dayData.expenseTotal.classList.toggle("hidden", expense === 0);
        dayData.incomeTotal.classList.toggle("hidden", income === 0);
        
        if (calendarDay.getMonth() === selectedDate.getMonth()) {
            totalExpense += expense;
            totalIncome += income;
        }
    }

    calendarDayMonthTotal.textContent = totalIncome - totalExpense;
}
