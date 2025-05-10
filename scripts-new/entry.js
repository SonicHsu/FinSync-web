import { categoryMap, typeColorMap, setColorClass } from "./entry-utils.js";

const entryTemplateElement = document.querySelector("[data-template ='entry']");

export function initEntry(parent, entry) {
    const entryContent = entryTemplateElement.content.cloneNode(true);
    const entryElement = entryContent.querySelector("[data-entry]");
    const entryCategoryColorElement = entryElement.querySelector("[data-entry-category-color]");
    const entryCategoryElement = entryElement.querySelector("[data-entry-category]");
    const entryNoteElement = entryElement.querySelector("[data-entry-note]");
    const entryAmountElement = entryElement.querySelector("[data-entry-amount]");

    const typeColorData = typeColorMap[entry.type] || typeColorMap.expense;
    const categoryData = categoryMap[entry.category] || categoryMap.other;
    const sign = entry.type === "income" ? "+" : "-";


    setColorClass(entryCategoryColorElement,categoryData.color);
    entryCategoryElement.textContent = categoryData.label;
    entryNoteElement.textContent = entry.note;
    setColorClass(entryAmountElement,typeColorData);
    entryAmountElement.textContent = sign + entry.amount;

    entryElement.addEventListener("click", () => {
        entryElement.dispatchEvent(new CustomEvent("entry-click", {
            detail: {
                entry,
            },
            bubbles: true
        }))
    });
  

    parent.appendChild(entryElement);
}
