import { validAmount, parseDate, validNote } from "./validators.js";


export function initEntryForm() {
    const dialogConfirmButton = document.querySelector("[data-dialog-confirm-button]");

    dialogConfirmButton.addEventListener("click", () => {
        const formEntry = formIntoEntry();

        dialogConfirmButton.dispatchEvent(new CustomEvent("event-create", {
            detail: {
                event: formEntry
            },
            bubbles: true
        }));

    })
}

function formIntoEntry() {
    const selectedType = document.querySelector('.button-option-selected[data-entry-type-button]')?.dataset.entryTypeButton;
    const selectedCategory = document.querySelector('.category-button-selected[data-entry-category]')?.dataset.entryCategory;
    const entryAmountInput = document.querySelector("[data-entry-amount-input]");
    const entryDate = document.querySelector("[data-entry-date]");
    const entryNoteInput = document.querySelector("[data-entry-note-input]");
    const selectedMode = document.querySelector('.category-button-selected[data-entry-mode]')?.dataset.entryMode;

    try {
        const amount = validAmount(entryAmountInput);
        const date = parseDate(entryDate);
        const note = validNote(entryNoteInput);
      
        const entryData = {
          type: selectedType,
          category: selectedCategory,
          amount,
          date,
          note,
          mode: selectedMode,
        };
      
        console.log('成功送出資料', entryData);
      
      } catch (error) {
        alert(error.message);
      }
}