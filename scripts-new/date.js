export function today() {
    const now = new Date();

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
}

export function addMonths(date, months) {
    const firstDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + months,
        1,
        date.getHours()
    );
    const lastDayOfMonth = getLastDayOfMonthDate(firstDayOfMonth);

    const dayOfMonth = Math.min(date.getDate(), lastDayOfMonth.getDate());

    return new Date(
        date.getFullYear(),
        date.getMonth() + months,
        dayOfMonth,
        date.getHours()
    );
}

export function subtractMonths(date, months) {
    return addMonths(date, -months);
}

export function addDays(date, days) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days,
        date.getHours()
    );
}

export function subtractDays(date, days) {
    return addDays(date, -days);
}


export function generateMonthCalendarDays(currentDate) {
    const calendarDays = [];

    const lastDayOfPreviousMonthDate = getLastDayOfMonthDate(
        subtractMonths(currentDate, 1)
    );

    const lastDayOfPreviousMonthWeekDay = lastDayOfPreviousMonthDate.getDay();
    if (lastDayOfPreviousMonthWeekDay !== 6) {
        for (let i = lastDayOfPreviousMonthWeekDay; i >= 0; i -= 1) {
            const calendarDay = subtractDays(lastDayOfPreviousMonthDate, i);
            calendarDays.push(calendarDay);
        }
    }

    const lastDayOfCurrentMonthDate = getLastDayOfMonthDate(currentDate);
    for (let i = 1; i <= lastDayOfCurrentMonthDate.getDate(); i += 1) {
        const calendarDay = addDays(lastDayOfPreviousMonthDate, i);
        calendarDays.push(calendarDay);
    }

    const totalWeeks = Math.ceil(calendarDays.length / 7);
    const totalDays = totalWeeks * 7;
    const missingDayAmount = totalDays - calendarDays.length;
    for (let i = 1; i <= missingDayAmount; i += 1) {
        const calendarDay = addDays(lastDayOfCurrentMonthDate, i);
        calendarDays.push(calendarDay);
    }

    return calendarDays;
}

export function isTheSameDay(dateA, dateB) {
    return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDate() === dateB.getDate();
}

export function isTheSameMonth(dateA, dateB) {
    return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
}

function getLastDayOfMonthDate(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
    );
}

export function formatDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleString('zh-TW', options);
}

export function formatMonth(date) {
    const options = { year: "numeric", month: "2-digit"};
    return date.toLocaleString('zh-TW', options);
}

export function formatDateForStats(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy} -${mm} -${dd}`;
}

export function formatMonthForStats(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    return `${yyyy} -${mm}`;
}

export function initDatePicker(entryFormElement) {
    const datePicker = entryFormElement.querySelector("[data-entry-date-picker]");
    const dateDisplay = entryFormElement.querySelector("[data-entry-date]");


    dateDisplay.addEventListener("click", () => datePicker.showPicker());

    datePicker.addEventListener("change", () => {
        const selectedDateStr = datePicker.value;
        const selectedDate = new Date(selectedDateStr);

        datePicker.dispatchEvent(new CustomEvent("dialog-date-change", {
            detail: { date: selectedDate },
            bubbles: true
        }));
    });

}

export function updateDateDisplay(entryFormElement, date) {
    const dateDisplay = entryFormElement.querySelector("[data-entry-date]");
    dateDisplay.textContent = formatDate(date);
}

