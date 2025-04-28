export function initEntryForm() {
    const formElement = document.querySelector("[data-entry-form]");
    const selectedType = document.querySelector('.button-option-selected[data-entry-type-button]')?.dataset.entryTypeButton;
    const selectedCategory = document.querySelector('.category-button-selected[data-entry-category]')?.dataset.entryCategory;
    const entryAmount = document.querySelector("[data-entry-amount]");
    const entryDate = document.querySelector("[data-entry-date]");
    const entryNote = document.querySelector("[data-entry-note]");
    const selectedMode = document.querySelector('.category-button-selected[data-entry-mode]')?.dataset.entryMode;




}