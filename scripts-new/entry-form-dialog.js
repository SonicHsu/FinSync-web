import { initDialog } from "./dialog.js";

export function initEntryFormDialog (){
    const dialog = initDialog("entry-form");
    const dateDisplay = document.querySelector('[data-entry-date]');
    const datePicker = document.querySelector('[data-entry-date-picker]');

    dateDisplay.addEventListener("click", () => {
        datePicker.showPicker();
    });

    initEntryOptionSelector("[data-entry-type-button]", "entryTypeButton", "button-option", "button-option-selected");
    initEntryOptionSelector("[data-entry-category]", "entryCategory", "category-button", "category-button-selected");
    initEntryOptionSelector("[data-entry-mode]", "entryMode", "category-button", "category-button-selected");

    document.addEventListener("entry-create-request", () => {
       dialog.open();
    });
}



function initEntryOptionSelector(selector, dataKey, defaultClass, selectedClass) {
    const buttons = document.querySelectorAll(selector);

    for (const button of buttons) {
        button.addEventListener("click", () => {
            const selectedValue = button.dataset[dataKey];

            for(const btn of buttons) {
                const isActive = btn.dataset[dataKey] === selectedValue;
                btn.classList.toggle(defaultClass, !isActive);
                btn.classList.toggle(selectedClass, isActive);
            };
        });
    };
}
