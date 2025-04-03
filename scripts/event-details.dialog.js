import { initDialog } from "./dialog.js";
import { eventTimeToDate } from "./event.js";

const eventDateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric"
});

const eventTimeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric"
});

export function initEventDetailsDialog() {
    const dialog = initDialog("event-details");

    const deleteButtonElement = dialog.dialogElement.querySelector("[data-event-details-delete-button]");

    const editButtonElement = dialog.dialogElement.querySelector("[data-event-details-edit-button]");

    let currentEvent = null;

    document.addEventListener("event-click", (event) => {
        currentEvent = event.detail.event;
        fillEventDetailsDialog(dialog.dialogElement, event.detail.event);
        dialog.open();
    });

    deleteButtonElement.addEventListener("click", () => {
        dialog
        .close()
        .then(() => {
            deleteButtonElement.dispatchEvent(new CustomEvent("event-delete-request", {
                detail: {
                    event: currentEvent
                },
                bubbles: true
            }));
        });
    });

    editButtonElement.addEventListener("click", () => {
        dialog
        .close()
        .then(() => {
            editButtonElement.dispatchEvent(new CustomEvent("event-edit-request", {
                detail: {
                    event: currentEvent
                },
                bubbles: true
            }));
        });
    });
}

function fillEventDetailsDialog(parent, event) {
    const eventDetailsElement = parent.querySelector("[data-event-details]");
    const eventDetailsTitleElement = eventDetailsElement.querySelector("[data-event-details-title]");
    const eventDetailDateElement = eventDetailsElement.querySelector("[data-event-details-date]");
    const eventDetailStartTimeElement = eventDetailsElement.querySelector("[data-event-details-start-time]");
    const eventDetailEndTimeElement = eventDetailsElement.querySelector("[data-event-details-end-time]");

    eventDetailsTitleElement.textContent = event.title;
    eventDetailDateElement.textContent = eventDateFormatter.format(event.date);
    eventDetailStartTimeElement.textContent = eventTimeFormatter.format(
        eventTimeToDate(event, event.startTime)
    );
    eventDetailEndTimeElement.textContent = eventTimeFormatter.format(
        eventTimeToDate(event, event.endTime)
    );

    eventDetailsElement.style.setProperty("--event-color", event.color);
}