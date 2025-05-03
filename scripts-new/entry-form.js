import { validAmount, parseDate, validNote } from "./validators.js";
import { generateEntryId } from "./entry.js";

export function initEntryForm(resetEntryForm) {
  const dialogConfirmButton = document.querySelector("[data-dialog-confirm-button]");
  const entryFormElement = document.querySelector("[data-entry-form]");

  dialogConfirmButton.addEventListener("click", () => {
    try {const formEntry = formIntoEntry(entryFormElement);

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

function formIntoEntry(entryFormElement) {
  const entryIdElement = entryFormElement.querySelector("[data-entry-id]");
  const id = entryIdElement.dataset.id
  const selectedType = entryFormElement.querySelector('.button-option-selected[data-entry-type-button]')?.dataset.entryTypeButton;
  const selectedCategory = entryFormElement.querySelector('.category-button-selected[data-entry-category]')?.dataset.entryCategory;
  const entryAmountInput = entryFormElement.querySelector("[data-entry-amount-input]");
  const entryDate = entryFormElement.querySelector("[data-entry-date]");
  const entryNoteInput = entryFormElement.querySelector("[data-entry-note-input]");
  const selectedMode = entryFormElement.querySelector('.category-button-selected[data-entry-mode]')?.dataset.entryMode;


  const amount = validAmount(entryAmountInput);
  const date = parseDate(entryDate);
  const note = validNote(entryNoteInput);

  
  
  return {
    id: id ? Number.parseInt(id, 10) : generateEntryId(),
    type: selectedType,
    category: selectedCategory,
    amount,
    date,
    note,
    mode: selectedMode,
  };

}