export function initDialog(name) {
    const dialogElement = document.querySelector(`[data-dialog="${name}"]`);
    const dialogBackDrop = document.querySelector("[data-dialog-backdrop]");


    dialogElement.addEventListener("click", (event) => {
        if (event.target === dialogElement) {
            dialogElement.close();
            dialogBackDrop.classList.add("hidden");
        }
    })

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