export function initEntryCreateButton() {
    const buttonElements = document.querySelectorAll("[data-entry-create-button]");

    for (const buttonElement of buttonElements) {
        buttonElement.addEventListener("click", () => {
            buttonElement.dispatchEvent(new CustomEvent
                ("entry-create-request", {
                    bubbles: true
                }));
        });
    }
}
