import { validAmount, parseDate, validNote } from "./validators.js";


export function initEntryForm(resetEntryForm) {
  const dialogConfirmButton = document.querySelector("[data-dialog-confirm-button]");

  dialogConfirmButton.addEventListener("click", () => {
    try {const formEntry = formIntoEntry();

      dialogConfirmButton.dispatchEvent(new CustomEvent("entry-create", {
        detail: {
          entry: formEntry
        },
        bubbles: true
      }));
  
      resetEntryForm();
      console.log('成功送出資料', formEntry);
    }
    catch(error) {
      alert(error.message);
    }


  })
}

function formIntoEntry() {
  const selectedType = document.querySelector('.button-option-selected[data-entry-type-button]')?.dataset.entryTypeButton;
  const selectedCategory = document.querySelector('.category-button-selected[data-entry-category]')?.dataset.entryCategory;
  const entryAmountInput = document.querySelector("[data-entry-amount-input]");
  const entryDate = document.querySelector("[data-entry-date]");
  const entryNoteInput = document.querySelector("[data-entry-note-input]");
  const selectedMode = document.querySelector('.category-button-selected[data-entry-mode]')?.dataset.entryMode;

  const amount = validAmount(entryAmountInput);
  const date = parseDate(entryDate);
  const note = validNote(entryNoteInput);

  return {
    type: selectedType,
    category: selectedCategory,
    amount,
    date,
    note,
    mode: selectedMode,
  };

}