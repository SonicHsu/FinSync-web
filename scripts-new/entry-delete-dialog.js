import { initDialog } from "./dialog.js";

export function initDeleteDialog() {
    const dialog = initDialog("entry-delete");
    const entryDeleteElement = dialog.dialogElement.querySelector("[data-entry-delete]");
    const dialogConfirmButton = entryDeleteElement.querySelector("[data-dialog-confirm-button]");

    let currentEvent = null;

    document.addEventListener("entry-delete-request", (event) => {
        currentEvent = event.detail.entry;
        dialog.open();
    })

    dialogConfirmButton.addEventListener("click", () => {
        dialog.close();
        dialogConfirmButton.dispatchEvent(new CustomEvent("entry-delete", {
            detail: { entry: currentEvent },
            bubbles: true
        }))
    })
}