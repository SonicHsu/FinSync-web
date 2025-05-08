import { initDialog } from "./dialog.js";
import { initEntryForm } from "./entry-form.js";
import { resetEntryForm, initCategorySwitcher } from "./entry-utils.js"
import { initDatePicker, updateDateDisplay } from "./date.js";
import { initEntryFormSelectors } from "./entry-form-selector.js";

export function initEntryFormDialog() {
    const dialog = initDialog("entry-form", { closeOnEvents: ["entry-create", "entry-edit"], });
    const entryFormElement = dialog.dialogElement.querySelector("[data-entry-form]");
    const entryFormTitle = entryFormElement.querySelector("[data-entry-form-title]");
    const entryAmountInput = entryFormElement.querySelector("[data-entry-amount-input]");
    const entryNoteInput = entryFormElement.querySelector("[data-entry-note-input]");

    const { typeSelector, modeSelector, expenseSelector, incomeSelector, categoryListsByType } = initEntryFormSelectors(entryFormElement);

    const selectors = {
        entryAmountInput,
        entryNoteInput,
        typeSelector,
        expenseSelector,
        incomeSelector,
        modeSelector,
    };

    initCategorySwitcher(entryFormElement, categoryListsByType);

    const entryForm = initEntryForm(dialog.dialogElement, () =>  resetEntryForm(selectors, categoryListsByType));

    initDatePicker(entryFormElement);




    dialog.dialogElement.addEventListener("close", () => {
        resetEntryForm(selectors, categoryListsByType);
    })

    entryAmountInput.addEventListener("input", (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    });

    document.addEventListener("dialog-date-change", (event) => {
        const selectedDate = event.detail.date
        updateDateDisplay(entryFormElement, selectedDate);
    })


    document.addEventListener("entry-create-request", (event) => {
        const selectedDate = event.detail.date
        entryFormTitle.textContent = "新增交易紀錄";
        updateDateDisplay(entryFormElement, selectedDate);
        resetEntryForm(selectors, categoryListsByType);
        entryForm.switchToCreateMode();
        dialog.open();
    });

    document.addEventListener("entry-edit-request", (event) => {
        entryFormTitle.textContent = "編輯交易紀錄";
        entryForm.switchToEditMode(event.detail.entry);
        dialog.open();
    });

}
