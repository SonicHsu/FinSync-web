export function initViewSelect() {
    const viewButtons = document.querySelectorAll("[data-view-switch]");
    let currentView = "day";

    document.dispatchEvent(new CustomEvent("view-change", {
        detail: { view: currentView },
        bubbles: true
    }));

    for (const viewButton of viewButtons) {
        const isActive = viewButton.dataset.viewSwitch === currentView;
        viewButton.classList.toggle("bg-white", isActive);
        viewButton.classList.toggle("text-gray-600", isActive);
        viewButton.classList.toggle("rounded-full", isActive);
        viewButton.classList.toggle("text-white/50", !isActive);
    }


    for (const viewButton of viewButtons) {
        viewButton.addEventListener("click", () => {
            const selectedView = viewButton.dataset.viewSwitch;

            for (const btn of viewButtons) {
                const isActive = btn.dataset.viewSwitch === selectedView;
                btn.classList.toggle("bg-white", isActive);
                btn.classList.toggle("text-gray-600", isActive);
                btn.classList.toggle("rounded-full", isActive);
                btn.classList.toggle("text-white/50", !isActive);
            }

            viewButton.dispatchEvent(new CustomEvent("view-change", {
                detail: { view: selectedView },
                bubbles: true
            }));
        });
    }
}