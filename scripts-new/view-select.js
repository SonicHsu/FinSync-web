export function initViewSelect() {
    const viewButtons = document.querySelectorAll("[data-view-switch]");
    let currentView = "day";

    document.dispatchEvent(new CustomEvent("view-change", {
        detail: { view: currentView },
        bubbles: true
    }));

    for (const viewButton of viewButtons) {
        const isActive = viewButton.dataset.viewSwitch === currentView;
        viewButton.classList.toggle("button-option", !isActive);
        viewButton.classList.toggle("button-option-selected", isActive);
    }


    for (const viewButton of viewButtons) {
        viewButton.addEventListener("click", () => {
            const selectedView = viewButton.dataset.viewSwitch;

            for (const btn of viewButtons) {
                const isActive = btn.dataset.viewSwitch === selectedView;
                btn.classList.toggle("button-option", !isActive);
                btn.classList.toggle("button-option-selected", isActive);
            }

            viewButton.dispatchEvent(new CustomEvent("view-change", {
                detail: { view: selectedView },
                bubbles: true
            }));
        });
    }
}