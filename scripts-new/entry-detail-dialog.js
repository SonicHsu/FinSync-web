import { initDialog } from "./dialog.js";
import { categoryMap, typeColorMap, setColorClass } from "./entry-utils.js";
import { formatDate } from "./date.js";

export function initEntryDetailDialog() {
    const dialog = initDialog("entry-detail");

    const editButtonElement = dialog.dialogElement.querySelector("[data-entry-detail-edit-button]");
    const deleteButtonElement = dialog.dialogElement.querySelector("[data-entry-detail-delete-button]");

    let currentEvent = null;

    document.addEventListener("entry-click", (event) => {
        currentEvent = event.detail.entry
        fillEntryDetailDialog(dialog.dialogElement, event.detail.entry)
        dialog.open();
    })

    editButtonElement.addEventListener("click", () => {
        dialog.close()
        console.log(currentEvent);
        editButtonElement.dispatchEvent(new CustomEvent("entry-edit-request", {
            detail: { entry: currentEvent, },
            bubbles: true
        }));
    });
}

function fillEntryDetailDialog(parent, entry) {
    const entryDetailElement = parent.querySelector("[data-entry-detail]");
    const entryDetailCategoryColorElement = entryDetailElement.querySelector("[data-entry-detail-category-color]");
    const entryDetailCategoryNameElement = entryDetailElement.querySelector("[data-entry-detail-category-name]");
    const entryDetailAmountElement = entryDetailElement.querySelector("[data-entry-detail-amount]");
    const entryDetailNoteElement = entryDetailElement.querySelector("[data-entry-detail-note]");
    const entryDetailDateElement = entryDetailElement.querySelector("[data-entry-detail-date]");

    const typeColorData = typeColorMap[entry.type] || typeColorMap.expense;
    const categoryData = categoryMap[entry.category] || categoryMap.other;
    const sign = entry.type === "income" ? "+" : "-";


    setColorClass(entryDetailCategoryColorElement, categoryData.color);
    entryDetailCategoryNameElement.textContent = categoryData.label;
    entryDetailNoteElement.textContent = entry.note;
    setColorClass(entryDetailAmountElement, typeColorData);
    entryDetailAmountElement.textContent = sign + entry.amount;
    entryDetailDateElement.textContent = formatDate(entry.date);


}


