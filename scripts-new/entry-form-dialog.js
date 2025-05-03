import { initDialog } from "./dialog.js";
import { initEntryForm } from "./entry-form.js";
import { formatDate } from './date.js';

export function initEntryFormDialog() {
    const dialog = initDialog("entry-form", { closeOnEvents: ["entry-create"], });
    const entryFormTitle = dialog.dialogElement.querySelector("[data-entry-form-title]");
    const dateDisplay = dialog.dialogElement.querySelector("[data-entry-date]");
    const datePicker = dialog.dialogElement.querySelector("[data-entry-date-picker]");
    const entryAmountInput = dialog.dialogElement.querySelector("[data-entry-amount-input]");
    const entryNoteInput = dialog.dialogElement.querySelector("[data-entry-note-input]");
    const typeSelector = initEntryOptionSelector("[data-entry-type-button]", "entryTypeButton", "button-option", "button-option-selected");
    const categorySelector = initEntryOptionSelector("[data-entry-category]", "entryCategory", "category-button", "category-button-selected");
    const modeSelector = initEntryOptionSelector("[data-entry-mode]", "entryMode", "category-button", "category-button-selected");

    const resetEntryForm = () => {
        entryAmountInput.value = "";
        entryNoteInput.value = "";

        typeSelector.resetToDefault();
        categorySelector.resetToDefault();
        modeSelector.resetToDefault();
    };

    const entryForm = initEntryForm(resetEntryForm);

    dialog.dialogElement.addEventListener("close", () => {
        resetEntryForm();
    })

    dateDisplay.addEventListener("click", () => {
        datePicker.showPicker();
    });

    datePicker.addEventListener("change", () => {
        const selectedDateStr = datePicker.value;
        const selectedDate = new Date(selectedDateStr);
        datePicker.dispatchEvent(new CustomEvent("date-change", {
            detail: {
                date: new Date(selectedDate)
            },
            bubbles: true
        }));
    });

    entryAmountInput.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    });

    document.addEventListener("date-change", (event) => {
        const selectedDate = event.detail.date
        updateDateDisplay(dialog, selectedDate);
    })


    document.addEventListener("entry-create-request", (event) => {
        const selectedDate = event.detail.date
        entryFormTitle.textContent = "新增交易紀錄";
        updateDateDisplay(dialog, selectedDate);
        resetEntryForm();
        dialog.open();
    });

    document.addEventListener("entry-edit-request", (event) => {
        entryFormTitle.textContent = "編輯交易紀錄";
        dialog.open();
    });

    

}

function updateDateDisplay(dialog, date) {
    const dateDisplay = dialog.dialogElement.querySelector('[data-entry-date]');
    dateDisplay.textContent = formatDate(date);
}



function initEntryOptionSelector(selector, dataKey, defaultClass, selectedClass) {
    const buttons = document.querySelectorAll(selector);

    let defaultButton = null;



    for (const button of buttons) {
        if (button.classList.contains(selectedClass)) {
            defaultButton = button;
        }


        button.addEventListener("click", () => {
            const selectedValue = button.dataset[dataKey];

            for (const btn of buttons) {
                const isActive = btn.dataset[dataKey] === selectedValue;
                btn.classList.toggle(defaultClass, !isActive);
                btn.classList.toggle(selectedClass, isActive);
            };
        });
    };

    function resetToDefault() {
        if (!defaultButton) return;

        for (const btn of buttons) {
            const isDefault = btn === defaultButton;
            btn.classList.toggle(defaultClass, !isDefault);
            btn.classList.toggle(selectedClass, isDefault);
        }
    }

    return {
        resetToDefault
    };
}
