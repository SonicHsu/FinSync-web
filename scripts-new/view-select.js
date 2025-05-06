export function initViewSelect() {
    const viewButtons = document.querySelectorAll("[data-view-switch]");
    let currentView = "day";

    // 初始化樣式
    updateViewButtons(currentView);

    // 廣播初始 view-change 事件
    document.dispatchEvent(new CustomEvent("view-change", {
        detail: { view: currentView },
        bubbles: true
    }));

    // 監聽外部的 view-change 事件
    document.addEventListener("view-change", (event) => {
        const selectedView = event.detail.view;
        updateViewButtons(selectedView);
        currentView = selectedView; 
    });

    // 監聽按鈕點擊事件並廣播 view-change
    for (const viewButton of viewButtons) {
        viewButton.addEventListener("click", () => {
            const selectedView = viewButton.dataset.viewSwitch;
            if (selectedView === currentView) return; // 避免重複觸發

            currentView = selectedView;
            updateViewButtons(selectedView);

            viewButton.dispatchEvent(new CustomEvent("view-change", {
                detail: { view: selectedView },
                bubbles: true
            }));
        });
    }

    function updateViewButtons(selectedView) {
        for (const btn of viewButtons) {
            const isActive = btn.dataset.viewSwitch === selectedView;
            btn.classList.toggle("button-option", !isActive);
            btn.classList.toggle("button-option-selected", isActive);
        }
    }
}


