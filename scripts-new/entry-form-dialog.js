import { initDialog } from "./dialog.js";

export function initEntryFormDialog (){
    const dialog = initDialog("entry-form");

    document.addEventListener("entry-create-request", () => {
       dialog.open();
    });
}