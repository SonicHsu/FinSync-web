export function initDialog(name) {
    const dialogElement = document.querySelector(`[data-dialog="${name}"]`);

    return {
        open() {
            dialogElement.showModal();
        },
        close() {
            dialogElement.close();
        }
    };
}