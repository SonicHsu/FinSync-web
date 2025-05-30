export function initDialog(name, options = {}) {
    const dialogElement = document.querySelector(`[data-dialog="${name}"]`);
    const dialogBackDrop = document.querySelector("[data-dialog-backdrop]");
    const dialogCancelButtons = document.querySelectorAll("[data-dialog-cancel-button]");
    


    dialogElement.addEventListener("click", (event) => {
        if (event.target === dialogElement) {
            dialogElement.close();
            dialogBackDrop.classList.add("hidden");
        }
    })

    for(const dialogCancelButton of dialogCancelButtons){
        dialogCancelButton.addEventListener("click", () => {
            dialogElement.close();
            dialogBackDrop.classList.add("hidden");
        });
    }


    if(options.closeOnEvents) {
        for(const eventName of options.closeOnEvents) {
            document.addEventListener(eventName, () => {
                dialogElement.close();
                dialogBackDrop.classList.add("hidden");
            });
        }
    }


    return {
        dialogElement,
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
