export function initDialog(name) {
    const dialogElement = document.querySelector(`[data-dialog="${name}"]`);
    const dialogBackDrop = document.querySelector("[data-dialog-backdrop]");
    const dialogCancekButton = document.querySelector("[data-dialog-cancel-button]");
    const dialogConfirmButton = document.querySelector("[data-dialog-confirm-button]");


    dialogElement.addEventListener("click", (event) => {
        if (event.target === dialogElement) {
            dialogElement.close();
            dialogBackDrop.classList.add("hidden");
        }
    })

    dialogCancekButton.addEventListener("click", (event) => {
        dialogElement.close();
        dialogBackDrop.classList.add("hidden");
    });


    return {
        open() {
            dialogElement.showModal();
            dialogBackDrop.classList.remove("hidden");
        },
        close() {
            dialogElement.close();
            dialogBackDrop.classList.add("hidden");
        }
    };
}
