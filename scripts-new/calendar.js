import { today } from "./date.js"
import { initMonthCalendar, updateMonthCalendarData } from "./month-calendar.js";
import { initDayCalendar, updateDayCalendarData } from "./day-calendar.js";
import { initEntryCreateButtons } from "./entry-create-button.js";

export async function initCalendar(entryStore) {
    const calendarElement = document.querySelector("[data-calendar]");

    let selectedView = "day";
    let selectedDate = today();
    let isInitialized = false;

    function initCalendarStructure() {
        calendarElement.replaceChildren();
        if (selectedView === "month") {
            initMonthCalendar(calendarElement, selectedDate); // 月視圖保持原邏輯
        } else {
            initDayCalendar(calendarElement); // 只渲染日視圖結構
        }
        initEntryCreateButtons(selectedDate);
        isInitialized = true;
    }

    async function updateCalendarData() {
        if (selectedView === "month") {
            await updateMonthCalendarData(calendarElement, selectedDate, entryStore); // 月視圖暫不優化
        } else {
            await updateDayCalendarData(calendarElement, selectedDate, entryStore);
        }
    }

    async function refreshCalendar() {
        if (!isInitialized) {
            initCalendarStructure();
        }
        await updateCalendarData();
    }

    document.addEventListener("view-change", (event) => {
        selectedView = event.detail.view;
        isInitialized = false; // 視圖改變時重建結構
        refreshCalendar();
    });

    document.addEventListener("date-change", (event) => {
        selectedDate = event.detail.date;
        updateCalendarData(); // 僅更新資料
    });

    document.addEventListener("entries-change", () => {
        updateCalendarData();
    });

    await refreshCalendar();
}