import { today } from "./date.js";



export function initEntryCreateButtons(selectedDate) {
 
    const buttonElements = document.querySelectorAll("[data-entry-create-button]");

    for (const buttonElement of buttonElements) {
        buttonElement.replaceWith(buttonElement.cloneNode(true));
    }

    const freshButtonElements = document.querySelectorAll("[data-entry-create-button]");
    for (const buttonElement of freshButtonElements) {
        buttonElement.addEventListener("click", () => {
            buttonElement.dispatchEvent(new CustomEvent("entry-create-request", {
                detail: { date: selectedDate },
                bubbles: true
            }));
            
        });
    } 
};

