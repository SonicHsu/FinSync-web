import { validAmount, parseDate, validNote } from "./validators.js";
import { generateEntryId } from "./entry.js";
import { initEntryOptionSelector } from "./entry-utils.js";
import { formatDate } from "./date.js";

export function initEntryForm(parent, resetEntryForm) {
    const entryFormElement = parent.querySelector("[data-entry-form]");
    const dialogConfirmButton = entryFormElement.querySelector("[data-dialog-confirm-button]");

  let mode = "create";

  dialogConfirmButton.addEventListener("click", () => {
    try {
      const formEntry = formIntoEntry(entryFormElement);

      if(mode === "create"){
        dialogConfirmButton.dispatchEvent(new CustomEvent("entry-create", {
          detail: {
            entry: formEntry
          },
          bubbles: true
        }));
      }

      if(mode === "edit"){
        dialogConfirmButton.dispatchEvent(new CustomEvent("entry-edit", {
          detail: {
            entry: formEntry
          },
          bubbles: true
        }));
      }



      resetEntryForm();
      console.log('成功送出資料', formEntry);
    }
    catch (error) {
      alert(error.message);
    }
  })

  return {
    switchToCreateMode() {
      mode = "create";

    },
    switchToEditMode(entry) {
      mode = "edit";
      fillEntryEditDialog(entryFormElement, entry);
    }

  }


}

function fillEntryEditDialog(entryFormElement, entry) {
  const entryIdElement = entryFormElement.querySelector("[data-entry-id]");
  const entryAmountInput = entryFormElement.querySelector("[data-entry-amount-input]");
  const entryDate = entryFormElement.querySelector("[data-entry-date]");
  const entryNoteInput = entryFormElement.querySelector("[data-entry-note-input]");
  const typeSelector = initEntryOptionSelector(entryFormElement, "[data-entry-type-button]", "entryTypeButton", "button-option", "button-option-selected");
  const categorySelector = initEntryOptionSelector(entryFormElement, "[data-entry-category]", "entryCategory", "category-button", "category-button-selected");
  const modeSelector = initEntryOptionSelector(entryFormElement, "[data-entry-mode]", "entryMode", "category-button", "category-button-selected");

  entryIdElement.dataset.id = entry.id;
  entryAmountInput.value = entry.amount;
  entryDate.textContent = formatDate(entry.date);
  entryNoteInput.value = entry.note;
  typeSelector.setSelected(entry.type);
  categorySelector.setSelected(entry.category);
  modeSelector.setSelected(entry.mode);

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