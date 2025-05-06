import { initDialog } from "./dialog.js";
import { initEntryForm } from "./entry-form.js";
import { formatDate } from "./date.js";
import { initEntryOptionSelector } from "./entry-utils.js"

export function initEntryFormDialog() {
    const dialog = initDialog("entry-form", { closeOnEvents: ["entry-create", "entry-edit"], });
    const entryFormElement = dialog.dialogElement.querySelector("[data-entry-form]");
    const entryFormTitle = entryFormElement.querySelector("[data-entry-form-title]");
    const dateDisplay = entryFormElement.querySelector("[data-entry-date]");
    const datePicker = entryFormElement.querySelector("[data-entry-date-picker]");
    const entryAmountInput = entryFormElement.querySelector("[data-entry-amount-input]");
    const entryNoteInput = entryFormElement.querySelector("[data-entry-note-input]");
    const typeSelector = initEntryOptionSelector(entryFormElement, "[data-entry-type-button]", "entryTypeButton", "button-option", "button-option-selected");
    const categorySelector = initEntryOptionSelector(entryFormElement, "[data-entry-category]", "entryCategory", "category-button", "category-button-selected");
    const modeSelector = initEntryOptionSelector(entryFormElement, "[data-entry-mode]", "entryMode", "category-button", "category-button-selected");

    const resetEntryForm = () => {
        entryAmountInput.value = "";
        entryNoteInput.value = "";

        typeSelector.resetToDefault();
        categorySelector.resetToDefault();
        modeSelector.resetToDefault();
    };



    const entryForm = initEntryForm(dialog.dialogElement, resetEntryForm);


    const expenseCategoryList = entryFormElement.querySelector('[data-entry-category-list-expense]');
    const incomeCategoryList = entryFormElement.querySelector('[data-entry-category-list-income]');

    // 用物件清楚對應「支出」和「收入」的分類清單
    const categoryListsByType = {
        expense: expenseCategoryList,
        income: incomeCategoryList,
    };

    // 監聽交易類型切換（支出 / 收入）
    entryFormElement.addEventListener("entryTypeChange", (event) => {
        console.log("聽到了1");
        const { key, value } = event.detail;

        if (key !== "entryTypeButton") return;

        console.log("聽到了2");
        console.log(event);

        // 先全部隱藏分類清單
        for (const list of Object.values(categoryListsByType)) {
            list.classList.add("hidden");
        }

        // 顯示目前選中的類型對應的分類清單
        const currentList = categoryListsByType[value];
        currentList.classList.remove("hidden");

        let currentCategorySelector = null;
        
        currentCategorySelector = initEntryOptionSelector(
            currentList,
            "[data-entry-category]",
            "entryCategory",
            "category-button",
            "category-button-selected"
        );
    });

    dialog.dialogElement.addEventListener("close", () => {
        resetEntryForm();
    })

    dateDisplay.addEventListener("click", () => {
        datePicker.showPicker();
    });

    datePicker.addEventListener("change", () => {
        const selectedDateStr = datePicker.value;
        const selectedDate = new Date(selectedDateStr);
        datePicker.dispatchEvent(new CustomEvent("dialog-date-change", {
            detail: {
                date: new Date(selectedDate)
            },
            bubbles: true
        }));
    });

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
        resetEntryForm();
        entryForm.switchToCreateMode();
        dialog.open();
    });

    document.addEventListener("entry-edit-request", (event) => {
        entryFormTitle.textContent = "編輯交易紀錄";
        entryForm.switchToEditMode(event.detail.entry);
        dialog.open();
    });



}

function updateDateDisplay(entryFormElement, date) {
    const dateDisplay = entryFormElement.querySelector('[data-entry-date]');
    dateDisplay.textContent = formatDate(date);
}