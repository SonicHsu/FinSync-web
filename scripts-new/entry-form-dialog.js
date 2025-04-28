import { initDialog } from "./dialog.js";

export function initEntryFormDialog() {
    const dialog = initDialog("entry-form");
    const dateDisplay = document.querySelector('[data-entry-date]');
    const datePicker = document.querySelector('[data-entry-date-picker]');

    initEntryOptionSelector("[data-entry-type-button]", "entryTypeButton", "button-option", "button-option-selected");
    initEntryOptionSelector("[data-entry-category]", "entryCategory", "category-button", "category-button-selected");
    initEntryOptionSelector("[data-entry-mode]", "entryMode", "category-button", "category-button-selected");

    dateDisplay.addEventListener("click", () => {
        datePicker.showPicker();
    });

    datePicker.addEventListener("change", () => {
        const selectedDateStr = datePicker.value;
        const selectedDate = new Date(selectedDateStr);
        document.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: new Date(selectedDate)
            },
            bubbles: true
        }));
    });

    document.addEventListener("date-change", (event) => {
        const selectedDate = event.detail.date
        updateDateDisplay(selectedDate);
    })


    document.addEventListener("entry-create-request", (event) => {
        const selectedDate = event.detail.date
        updateDateDisplay(selectedDate);
        dialog.open();
    });
}

function updateDateDisplay(date) {
    const dateDisplay = document.querySelector('[data-entry-date]');
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    dateDisplay.textContent = `${year}/${month}/${day}`;
}



function initEntryOptionSelector(selector, dataKey, defaultClass, selectedClass) {
    const buttons = document.querySelectorAll(selector);

    for (const button of buttons) {
        button.addEventListener("click", () => {
            const selectedValue = button.dataset[dataKey];

            for (const btn of buttons) {
                const isActive = btn.dataset[dataKey] === selectedValue;
                btn.classList.toggle(defaultClass, !isActive);
                btn.classList.toggle(selectedClass, isActive);
            };
        });
    };
}
