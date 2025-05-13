export function initViewStatsButtons(selectedDate) {
    const buttonElements = document.querySelectorAll("[data-view-stats-button]");

    for (const buttonElement of buttonElements) {
        buttonElement.addEventListener("click", () => {
            buttonElement.dispatchEvent(new CustomEvent("view-stats-request", {
                detail: { date: selectedDate },
                bubbles: true
            }));
        });
    }
};
